
import './App.css';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

// Eagerly load critical components
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy load below-the-fold components
const About = lazy(() => import('./components/About'));
const Menu = lazy(() => import('./components/Menu'));
const PreOrder = lazy(() => import('./components/PreOrder'));
const Hours = lazy(() => import('./components/Hours'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Header />
        <main className="main-content-wrapper" id="main-content">
          <Hero />
          <Suspense fallback={<div style={{minHeight: '100vh', background: 'linear-gradient(135deg, var(--bg-very-light) 0%, var(--bg-light) 100%)'}} />}>
            <div className="section-wrapper">
              <About />
              <Menu />
              <PreOrder />
              <Hours />
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
