
import './App.css';
import { lazy, Suspense, useState, useMemo, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import AdminPage from './components/AdminPage';
import { getApiBaseUrl } from './lib/apiBaseUrl';
import { isMenuItemUnavailableToday, loadDailyUnavailableMap } from './lib/menuAvailability';

// Eagerly load critical components
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy load below-the-fold components
const About = lazy(() => import('./components/About'));
const Reviews = lazy(() => import('./components/Reviews'));
const Menu = lazy(() => import('./components/Menu'));
const Hours = lazy(() => import('./components/Hours'));
const OrderingGuide = lazy(() => import('./components/OrderingGuide'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Temporary override: set true to disable online ordering across the site.
const FORCE_ORDERING_CLOSED = false;

// Temporary override: keep false for normal ordering schedule checks.
const FORCE_ORDERING_OPEN = false;

// Check if ordering is allowed based on current time and day
function getOrderingStatus() {
  if (FORCE_ORDERING_CLOSED) {
    return {
      isOrderingAllowed: false,
      message: 'Online ordering is temporarily unavailable. Please call the cafe to place an order.',
    };
  }

  if (FORCE_ORDERING_OPEN) {
    return {
      isOrderingAllowed: true,
      message: '',
    };
  }

  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentTime = now.getHours() + now.getMinutes() / 60;

  const isTuesdayToFriday = day >= 2 && day <= 5;
  const isSaturday = day === 6;
  const OPENING_TIME = isSaturday ? 8 : 7;
  const CUTOFF_TIME = 16;

  if (day === 0 || day === 1) {
    return {
      isOrderingAllowed: false,
      message: 'We are closed on Sundays and Mondays. Orders reopen Tuesday at 7:00 AM.'
    };
  }

  if (!isTuesdayToFriday && !isSaturday) {
    return {
      isOrderingAllowed: false,
      message: 'Orders are currently unavailable.'
    };
  }

  // Check if before opening time
  if (currentTime < OPENING_TIME) {
    return {
      isOrderingAllowed: false,
      message: `Orders are not available yet. We open for online orders at ${isSaturday ? '8:00 AM' : '7:00 AM'}.`
    };
  }

  // Check if after cutoff time
  if (currentTime >= CUTOFF_TIME) {
    return {
      isOrderingAllowed: false,
      message: 'Orders are closed for the day. The daily cutoff is 4:00 PM. Please come back during business hours.'
    };
  }

  return {
    isOrderingAllowed: true,
    message: ''
  };
}

function getIsAdminRoute() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.location.pathname === '/admin' || window.location.hash === '#/admin';
}

function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(() => getIsAdminRoute());
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const orderingStatus = useMemo(() => getOrderingStatus(), []);

  useEffect(() => {
    const syncRoute = () => setIsAdminRoute(getIsAdminRoute());
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);

    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const totalCents = useMemo(
    () => cart.reduce((sum, item) => sum + item.amount * item.quantity, 0),
    [cart]
  );

  if (isAdminRoute) {
    return (
      <ErrorBoundary>
        <AdminPage />
      </ErrorBoundary>
    );
  }

  const addToCart = (item) => {
    const unavailableMap = loadDailyUnavailableMap();
    const isUnavailableNow = isMenuItemUnavailableToday(item?.name, unavailableMap);

    if (isUnavailableNow) {
      setCheckoutError(`${item.name} is unavailable today.`);
      return;
    }

    if (item?.isUnavailableToday) {
      setCheckoutError(`${item.name} is unavailable today.`);
      return;
    }

    if (!orderingStatus.isOrderingAllowed) {
      setCheckoutError(orderingStatus.message);
      return;
    }
    setCheckoutError('');
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.name === item.name);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemName, change) => {
    setCheckoutError('');
    setCart((current) =>
      current
        .map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = async () => {
    if (!cart.length || isCheckingOut) {
      return;
    }

    if (!orderingStatus.isOrderingAllowed) {
      setCheckoutError(orderingStatus.message);
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError('');

    try {
      const unavailableMap = loadDailyUnavailableMap();
      const blockedItem = cart.find((item) => isMenuItemUnavailableToday(item?.name, unavailableMap));
      if (blockedItem) {
        throw new Error(`${blockedItem.name} is unavailable today. Please remove it from your cart.`);
      }

      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          items: cart.map((item) => ({
            name: item.name,
            variationId: item.variationId || undefined,
            quantity: String(item.quantity),
            note: item.note || undefined,
            basePriceMoney: {
              amount: item.amount,
              currency: 'USD',
            },
          })),
        }),
      });

      const result = await response.json();
      if (!response.ok || !result?.url) {
        throw new Error(result?.details || result?.error || 'Unable to create checkout');
      }

      window.location.href = result.url;
    } catch (error) {
      setCheckoutError(error.message || 'Checkout failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <Header 
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
          customerName={customerName}
          onCustomerNameChange={setCustomerName}
          isCheckingOut={isCheckingOut}
          checkoutError={checkoutError}
          totalCents={totalCents}
        />
        <main className="main-content-wrapper" id="main-content">
          <Hero />
          <Suspense fallback={<div style={{minHeight: '100vh', background: 'linear-gradient(135deg, var(--bg-very-light) 0%, var(--bg-light) 100%)'}} />}>
            <div className="section-wrapper">
              <About />
              <Reviews />
              <Hours />
              <Menu onAddToCart={addToCart} cart={cart} orderingStatus={orderingStatus} />
              <OrderingGuide />
              <FAQ />
              <Contact />
            </div>
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
