// Header.jsx - BB's Bakery & Cafe
import React, { useState, memo } from 'react';
import '../sticky-header.css';
import '../burger-menu.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Header = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when preorder image modal opens
  React.useEffect(() => {
    const handlePreorderImageModalToggle = (event) => {
      if (event.detail && event.detail.open) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('bb-preorder-image-modal-toggle', handlePreorderImageModalToggle);
    return () => {
      window.removeEventListener('bb-preorder-image-modal-toggle', handlePreorderImageModalToggle);
    };
  }, []);

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
  
  return (
    <>
      <a href="#main-content" style={{position: 'fixed', top: 0, left: 0, background: '#d65a8c', color: 'white', padding: '8px', zIndex: 10012, clip: 'rect(0,0,0,0)', width: '1px', height: '1px', overflow: 'hidden'}} onFocus={(e) => e.target.style.clip = 'auto'} onBlur={(e) => e.target.style.clip = 'rect(0,0,0,0)'}>Skip to main content</a>
      <header 
      className="flex items-center justify-between sticky-header"
      style={{
        borderBottom: '1px solid #efefef',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
        backdropFilter: 'blur(30px)',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1.5rem, 5vw, 2.5rem)',
        minHeight: '75px',
        height: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10010
      }}
    >
      <div className="logo flex items-center" style={{gap: '1rem', flexShrink: 0, minWidth: '0'}}>
        <img 
          src="/assets/images/logo.webp" 
          alt="BB's Bakery & Cafe - Fresh Baked Goods in Pennington Gap, Virginia" 
          width="60" 
          height="60" 
          className="br-100" 
          style={{
            boxShadow: '0 4px 12px rgba(214, 90, 140, 0.2)',
            border: '2px solid #f0f0f0',
            objectFit: 'cover'
          }} 
          fetchPriority="high"
          decoding="async"
        />
        <span 
          className="fw7" 
          style={{
            fontFamily: 'Playfair Display, serif',
            color: '#1a1a1a',
            fontSize: 'clamp(1rem, 4vw, 1.3rem)',
            letterSpacing: '-0.5px'
          }}
        >
          BB's Bakery
        </span>
      </div>
      
      {/* Desktop Nav - hidden when burger menu is open */}
      <nav 
        className="dn db-ns flex items-center"
        style={{gap: 'clamp(1rem, 3vw, 2rem)'}} 
        role="navigation" 
        aria-label="Main navigation"
      >
        {/* ...existing code for links... */}
        <a 
          href="#about" 
          className="fw6 br-pill no-underline" 
          style={{
            color: '#6d6d6d',
            transition: 'all 0.25s ease',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            padding: 'clamp(0.6rem, 1.2vw, 0.9rem) clamp(1rem, 2vw, 1.3rem)',
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }} 
          onMouseOver={(e) => {
            e.target.style.background = '#f5f5f5';
            e.target.style.color = '#1a1a1a';
          }} 
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#6d6d6d';
          }}
        >
          About
        </a>
        <a 
          href="#menu" 
          className="fw6 br-pill no-underline" 
          style={{
            color: '#6d6d6d',
            transition: 'all 0.25s ease',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            padding: 'clamp(0.6rem, 1.2vw, 0.9rem) clamp(1rem, 2vw, 1.3rem)',
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }} 
          onMouseOver={(e) => {
            e.target.style.background = '#f5f5f5';
            e.target.style.color = '#1a1a1a';
          }} 
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#6d6d6d';
          }}
        >
          Menu
        </a>
        <a 
          href="#hours" 
          className="fw6 br-pill no-underline" 
          style={{
            color: '#6d6d6d',
            transition: 'all 0.25s ease',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            padding: 'clamp(0.6rem, 1.2vw, 0.9rem) clamp(1rem, 2vw, 1.3rem)',
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }} 
          onMouseOver={(e) => {
            e.target.style.background = '#f5f5f5';
            e.target.style.color = '#1a1a1a';
          }} 
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#6d6d6d';
          }}
        >
          Reviews
        </a>
        <a 
          href="#faq" 
          className="fw6 br-pill no-underline" 
          style={{
            color: '#6d6d6d',
            transition: 'all 0.25s ease',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            padding: 'clamp(0.6rem, 1.2vw, 0.9rem) clamp(1rem, 2vw, 1.3rem)',
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }} 
          onMouseOver={(e) => {
            e.target.style.background = '#f5f5f5';
            e.target.style.color = '#1a1a1a';
          }} 
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#6d6d6d';
          }}
        >
          FAQ
        </a>
        <a 
          href="#contact" 
          className="fw6 br-pill no-underline" 
          style={{
            color: '#6d6d6d',
            transition: 'all 0.25s ease',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            padding: 'clamp(0.6rem, 1.2vw, 0.9rem) clamp(1rem, 2vw, 1.3rem)',
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }} 
          onMouseOver={(e) => {
            e.target.style.background = '#f5f5f5';
            e.target.style.color = '#1a1a1a';
          }} 
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#6d6d6d';
          }}
        >
          Contact
        </a>
        <a 
          href="#contact" 
          className="fw6 br-pill no-underline" 
          style={{
            color: '#6d6d6d',
            transition: 'all 0.25s ease',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            padding: 'clamp(0.6rem, 1.2vw, 0.9rem) clamp(1rem, 2vw, 1.3rem)',
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }} 
          onMouseOver={(e) => {
            e.target.style.background = '#f5f5f5';
            e.target.style.color = '#1a1a1a';
          }} 
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#6d6d6d';
          }}
        >
          Contact
        </a>
        <a 
          href="tel:2765710891" 
          className="fw6 br-pill flex items-center no-underline white" 
          style={{
            background: 'linear-gradient(135deg, #d65a8c 0%, #c9a961 100%)',
            marginLeft: 'clamp(1rem, 3vw, 2.5rem)',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(214, 90, 140, 0.25)',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            fontWeight: '600',
            letterSpacing: '0.3px',
            padding: 'clamp(0.7rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 1.5rem)',
            whiteSpace: 'nowrap'
          }} 
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 24px rgba(214, 90, 140, 0.35)';
          }} 
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 16px rgba(214, 90, 140, 0.25)';
          }}
        >
          <FontAwesomeIcon icon={faPhone} className="mr2" /> (276) 571-0891
        </a>
      </nav>
      
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
      <a 
        href="#about" 
        className="no-underline" 
        style={{
          color: '#1a1a1a',
          padding: '0.6rem 0.8rem',
          borderBottom: '1px solid #f0f0f0',
          fontSize: '0.9rem',
          fontWeight: '500',
          transition: 'background 0.2s'
        }}
        onClick={handleClose}
        onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
        onMouseOut={(e) => e.target.style.background = 'transparent'}
      >
        About
      </a>
      <a 
        href="#menu" 
        className="no-underline" 
        style={{
          color: '#1a1a1a',
          padding: '0.6rem 0.8rem',
          borderBottom: '1px solid #f0f0f0',
          fontSize: '0.9rem',
          fontWeight: '500',
          transition: 'background 0.2s'
        }}
        onClick={handleClose}
        onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
        onMouseOut={(e) => e.target.style.background = 'transparent'}
      >
        Menu
      </a>
      <a 
        href="#hours" 
        className="no-underline" 
        style={{
          color: '#1a1a1a',
          padding: '0.6rem 0.8rem',
          borderBottom: '1px solid #f0f0f0',
          fontSize: '0.9rem',
          fontWeight: '500',
          transition: 'background 0.2s'
        }}
        onClick={handleClose}
        onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
        onMouseOut={(e) => e.target.style.background = 'transparent'}
      >
        Hours
      </a>
      <a 
        href="#reviews" 
        className="no-underline" 
        style={{
          color: '#1a1a1a',
          padding: '0.6rem 0.8rem',
          borderBottom: '1px solid #f0f0f0',
          fontSize: '0.9rem',
          fontWeight: '500',
          transition: 'background 0.2s'
        }}
        onClick={handleClose}
        onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
        onMouseOut={(e) => e.target.style.background = 'transparent'}
      >
        Reviews
      </a>
      <a 
        href="#faq" 
        className="no-underline" 
        style={{
          color: '#1a1a1a',
          padding: '0.6rem 0.8rem',
          borderBottom: '1px solid #f0f0f0',
          fontSize: '0.9rem',
          fontWeight: '500',
          transition: 'background 0.2s'
        }}
        onClick={handleClose}
        onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
        onMouseOut={(e) => e.target.style.background = 'transparent'}
      >
        FAQ
      </a>
      <a 
        href="#contact" 
        className="no-underline" 
        style={{
          color: '#1a1a1a',
          padding: '0.6rem 0.8rem',
          borderBottom: '1px solid #f0f0f0',
          fontSize: '0.9rem',
          fontWeight: '500',
          transition: 'background 0.2s'
        }}
        onClick={handleClose}
        onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
        onMouseOut={(e) => e.target.style.background = 'transparent'}
      >
        Contact
      </a>
      <a 
        href="tel:2765710891" 
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
        <FontAwesomeIcon icon={faPhone} /> (276) 571-0891
      </a>
    </nav>
    </>
  );
});

Header.displayName = 'Header';
export default Header;

