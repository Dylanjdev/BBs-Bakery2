// Header.jsx - BB's Bakery & Cafe
import React, { useState, memo } from 'react';
import '../sticky-header.css';
import '../burger-menu.css';
import '../cart.css';
import CartModal from './CartModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/catering', label: 'Catering' },
  { href: '/faq', label: 'FAQ' },
  { href: '/custom-cakes', label: 'Custom Cakes' },
  { href: '/contact', label: 'Contact' },
];

const Header = memo(({
  currentPath,
  cart,
  onUpdateQuantity,
  onCheckout,
  customerName,
  onCustomerNameChange,
  isCheckingOut,
  checkoutError,
  totalCents,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
    };
  }, [menuOpen]);
  const handleToggle = () => setMenuOpen(!menuOpen);
  const handleClose = () => setMenuOpen(false);
  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);
  const handleInternalNavigate = (event, path) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    handleClose();
  };
  
  return (
    <>
      <a href="#main-content" style={{position: 'fixed', top: 0, left: 0, background: '#d65a8c', color: 'white', padding: '8px', zIndex: 10012, clip: 'rect(0,0,0,0)', width: '1px', height: '1px', overflow: 'hidden'}} onFocus={(e) => e.target.style.clip = 'auto'} onBlur={(e) => e.target.style.clip = 'rect(0,0,0,0)'}>Skip to main content</a>
      <header className="sticky-header">
      <a
        href="/"
        className="site-logo no-underline"
        onClick={(e) => handleInternalNavigate(e, '/')}
        aria-label="BB's Bakery home"
      >
        <img 
          src="/assets/images/logo.webp" 
          alt="BB's Bakery & Cafe - Fresh Baked Goods in Pennington Gap, Virginia" 
          width="52"
          height="52"
          className="site-logo__image"
          fetchPriority="auto"
          decoding="async"
        />
        <span className="site-logo__name">
          BB's Bakery
        </span>
      </a>
      
      <nav
        className="desktop-nav"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="desktop-nav__links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`desktop-nav__link no-underline${currentPath === link.href ? ' active' : ''}`}
              onClick={(event) => handleInternalNavigate(event, link.href)}
              aria-current={currentPath === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="desktop-cta-group">
          <a href="tel:2765370189" className="desktop-phone-link no-underline">
            <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
            <span className="desktop-phone-link__full">(276) 537-0189</span>
            <span className="desktop-phone-link__short">Call</span>
          </a>
          <button
            type="button"
            className="desktop-cart-btn"
            onClick={handleOpenCart}
            aria-label={`Open cart${cart.length ? ` with ${cart.length} items` : ''}`}
          >
            <FontAwesomeIcon icon={faShoppingCart} aria-hidden="true" />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="desktop-cart-badge">{cart.length}</span>
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile Cart Button - Only visible on mobile */}
      <button
        type="button"
        className="mobile-cart-btn"
        onClick={handleOpenCart}
        aria-label={`Open cart${cart.length ? ` with ${cart.length} items` : ''}`}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '4.25rem',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: cart.length > 0 
            ? 'linear-gradient(135deg, #d65a8c 0%, #c9a961 100%)'
            : '#e0e0e0',
          color: 'white',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          fontSize: '1.1rem'
        }}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        {cart.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            minWidth: '20px',
            height: '20px',
            borderRadius: '999px',
            background: '#ff4757',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: '700',
            padding: '0 0.3rem',
            lineHeight: '1',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}>
            {cart.length}
          </span>
        )}
      </button>

      {/* Mobile Nav Toggle */}
      <button
        className="burger-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={handleToggle}
        style={{ position: 'absolute', top: '1rem', right: '1rem', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '44px', height: '44px', background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}
      >
        <span className={`burger-bar top${menuOpen ? ' open' : ''}`}></span>
        <span className={`burger-bar middle${menuOpen ? ' open' : ''}`}></span>
        <span className={`burger-bar bottom${menuOpen ? ' open' : ''}`}></span>
      </button>
      
      {/* Backdrop overlay - prevents interaction with page behind menu */}
      {menuOpen && (
          <div
            onClick={handleClose}
            aria-hidden="true"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 99998
            }}
          />
      )}
    </header>
    
    {/* Mobile Nav Overlay - rendered outside header for proper fixed positioning */}
    <nav
      className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`}
      role="navigation"
      aria-label="Mobile navigation"
    >
      {/* Close button for mobile nav - bigger and above links */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '0', padding: '0.3rem 0.5rem 0 0' }}>
        <button
          className="mobile-nav-close-btn"
          aria-label="Close menu"
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '2.8rem',
            color: '#d65a8c',
            cursor: 'pointer',
            zIndex: 10001,
            fontWeight: 700,
            lineHeight: 1,
            padding: 0,
            transition: 'color 0.2s',
          }}
          tabIndex={menuOpen ? 0 : -1}
        >
          ×
        </button>
      </div>
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={`mobile-nav-link no-underline${currentPath === link.href ? ' active' : ''}`}
          onClick={(event) => handleInternalNavigate(event, link.href)}
          aria-current={currentPath === link.href ? 'page' : undefined}
          tabIndex={menuOpen ? 0 : -1}
        >
          {link.label}
        </a>
      ))}
      <a 
        href="tel:2765370189" 
        className="no-underline" 
        style={{
          color: '#ffffff',
          background: 'linear-gradient(135deg, #d65a8c 0%, #c9a961 100%)',
          padding: '0.6rem 0.8rem',
          fontSize: '0.9rem',
          fontWeight: '600',
          margin: '0.3rem',
          borderRadius: '8px',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
        onClick={handleClose}
        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
      >
        <FontAwesomeIcon icon={faPhone} /> (276) 537-0189
      </a>
    </nav>
    <CartModal
      isOpen={isCartOpen}
      onClose={handleCloseCart}
      cart={cart}
      onUpdateQuantity={onUpdateQuantity}
      onCheckout={onCheckout}
      customerName={customerName}
      onCustomerNameChange={onCustomerNameChange}
      isCheckingOut={isCheckingOut}
      checkoutError={checkoutError}
      totalCents={totalCents}
    />
    </>
  );
});

Header.displayName = 'Header';
export default Header;
