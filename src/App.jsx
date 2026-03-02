
import './App.css';
import { lazy, Suspense, useState, useMemo } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

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

// Check if ordering is allowed based on current time and day
function getOrderingStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentTime = now.getHours() + now.getMinutes() / 60;

  // Saturday opens at 8, other days at 7
  const OPENING_TIME = day === 6 ? 8.5 : 7.5;
  // Order cutoff time is 1:30 PM (13.5)
  const CUTOFF_TIME = 13.5;

  // Sunday (0) is closed
  if (day === 0) {
    return {
      isOrderingAllowed: false,
      message: 'We are closed on Sundays. Orders reopen Monday at 7:30 AM.'
    };
  }

  // Check if before opening time
  if (currentTime < OPENING_TIME) {
    const openTime = day === 6 ? '8:30 AM' : '7:30 AM';
    return {
      isOrderingAllowed: false,
      message: `Orders are not available yet. We open for online orders at ${openTime}.`
    };
  }

  // Check if after cutoff time
  if (currentTime >= CUTOFF_TIME) {
    return {
      isOrderingAllowed: false,
      message: 'Orders are closed. The daily cutoff is 1:30 PM. Please come back tomorrow!'
    };
  }

  return {
    isOrderingAllowed: true,
    message: ''
  };
}

function App() {
  const [cart, setCart] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const orderingStatus = useMemo(() => getOrderingStatus(), []);

  const totalCents = useMemo(
    () => cart.reduce((sum, item) => sum + item.amount * item.quantity, 0),
    [cart]
  );

  const addToCart = (item) => {
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

    setIsCheckingOut(true);
    setCheckoutError('');

    try {
      const apiBaseUrl = (import.meta.env.VITE_API_URL || 'https://bbbackend-ntbt.onrender.com').replace(/\/$/, '');
      const response = await fetch(`${apiBaseUrl}/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            name: item.name,
            variationId: item.variationId || undefined,
            quantity: String(item.quantity),
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
