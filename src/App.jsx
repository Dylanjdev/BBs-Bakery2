
import './App.css';
import { lazy, Suspense, useState, useMemo, useEffect, useRef } from 'react';
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
const HomeHighlights = lazy(() => import('./components/HomeHighlights'));
const OrderingGuide = lazy(() => import('./components/OrderingGuide'));
const CustomCakeForm = lazy(() => import('./components/CustomCakeForm'));
const Catering = lazy(() => import('./components/Catering'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Temporary override: set true to disable online ordering across the site.
const FORCE_ORDERING_CLOSED = true;

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
  const OPENING_TIME = isSaturday ? 10 : 8;
  const CUTOFF_TIME = 16;

  if (day === 0 || day === 1) {
    return {
      isOrderingAllowed: false,
      message: 'We are closed on Sundays and Mondays. Orders reopen Tuesday at 8:00 AM.'
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
      message: `Orders are not available yet. We open for online orders at ${isSaturday ? '10:00 AM' : '8:00 AM'}.`
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

  return getCurrentPath() === '/admin';
}

function getCurrentPath() {
  if (typeof window === 'undefined') {
    return '/';
  }

  if (window.location.hash.startsWith('#/')) {
    return normalizePath(window.location.hash.slice(1));
  }

  return normalizePath(window.location.pathname || '/');
}

function normalizePath(path) {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
}

const routeMetadata = {
  '/': {
    title: "BB's Bakery & Cafe - Pennington Gap, Lee County & Southwest Virginia",
    description: "Fresh-baked goodness made with love daily in Pennington Gap, VA. Browse our menu, hours, reviews, and ordering information.",
    urlPath: '/',
  },
  '/about': {
    title: "About BB's Bakery & Cafe | Pennington Gap VA bakery",
    description: "Learn about BB's Bakery & Cafe, our fresh daily baked goods, community roots, and our commitment to local quality.",
    urlPath: '/about',
  },
  '/menu': {
    title: "Menu | BB's Bakery & Cafe",
    description: "See our bakery and cafe menu including pastries, breads, coffees, and daily specials available for pickup in Pennington Gap.",
    urlPath: '/menu',
  },
  '/reviews': {
    title: "Reviews | BB's Bakery & Cafe",
    description: "Read what customers say about BB's Bakery & Cafe — fresh pastries, great coffee, and friendly service in Southwest Virginia.",
    urlPath: '/reviews',
  },
  '/hours': {
    title: "Hours | BB's Bakery & Cafe",
    description: "Find BB's Bakery & Cafe opening hours, ordering windows, and holiday schedule for Pennington Gap, Virginia.",
    urlPath: '/hours',
  },
  '/ordering-guide': {
    title: "Ordering Guide | BB's Bakery & Cafe",
    description: "Get step-by-step instructions for placing an online order at BB's Bakery & Cafe, including menu add-ons and pickup details.",
    urlPath: '/ordering-guide',
  },
  '/custom-cakes': {
    title: "Custom Cakes | BB's Bakery & Cafe",
    description: "Order a custom cake from BB's Bakery & Cafe with fresh designs, local ingredients, and pickup in Pennington Gap.",
    urlPath: '/custom-cakes',
  },
  '/catering': {
    title: "Catering in Pennington Gap, VA | BB's Bakery & Cafe",
    description: "Plan fresh bakery, breakfast, lunch, office, party, and dessert catering from BB's Bakery & Cafe in Pennington Gap, VA. Request a custom quote.",
    urlPath: '/catering',
  },
  '/faq': {
    title: "FAQ | BB's Bakery & Cafe",
    description: "Find answers to common questions about orders, pickup, payments, and menu availability at BB's Bakery & Cafe.",
    urlPath: '/faq',
  },
  '/contact': {
    title: "Contact | BB's Bakery & Cafe",
    description: "Contact BB's Bakery & Cafe for orders, questions, and special requests in Pennington Gap, VA.",
    urlPath: '/contact',
  },
};

function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(() => getIsAdminRoute());
  const [currentPath, setCurrentPath] = useState(() => getCurrentPath());
  const hasMounted = useRef(false);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const orderingStatus = useMemo(() => getOrderingStatus(), []);

  useEffect(() => {
    const syncRoute = () => {
      setCurrentPath(getCurrentPath());
      setIsAdminRoute(getIsAdminRoute());
    };
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);

    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  useEffect(() => {
    const meta = routeMetadata[currentPath] || routeMetadata['/'];
    document.title = meta.title;

    const setMetaContent = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', value);
      }
    };

    const url = `${window.location.origin}${meta.urlPath}`;
    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
  }, [currentPath]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }, [currentPath]);

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

    const missingVariationItem = cart.find(
      (item) => typeof item?.variationId !== 'string' || !item.variationId.trim()
    );
    if (missingVariationItem) {
      setCheckoutError(`${missingVariationItem.name} is not currently available for online checkout. Please remove it and try again.`);
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

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return (
          <>
            <Hero />
            <HomeHighlights />
            <Hours />
          </>
        );
      case '/about':
        return <About />;
      case '/reviews':
        return <Reviews />;
      case '/hours':
        return <Hours />;
      case '/menu':
        return (
          <>
            <Menu onAddToCart={addToCart} cart={cart} orderingStatus={orderingStatus} />
            <OrderingGuide />
          </>
        );
      case '/ordering-guide':
        return <OrderingGuide />;
      case '/custom-cakes':
        return <CustomCakeForm />;
      case '/catering':
        return <Catering />;
      case '/faq':
        return <FAQ />;
      case '/contact':
        return <Contact />;
      default:
        return <Hero />;
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
          <Suspense fallback={<div style={{minHeight: '100vh', background: 'linear-gradient(135deg, var(--bg-very-light) 0%, var(--bg-light) 100%)'}} />}>
            <div className={`section-wrapper${currentPath === '/' ? ' section-wrapper-home' : ' section-wrapper-page'}`}>
              {renderPage()}
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
