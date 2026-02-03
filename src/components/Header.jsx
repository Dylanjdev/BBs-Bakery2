// Header.jsx - BB's Bakery & Cafe
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <header className="site-header">
    <div className="logo">
      <img src="/assets/images/logo.jpg" alt="BB's Bakery & Cafe - Fresh Baked Goods in Pennington Gap, Virginia" width="150" height="150" fetchpriority="high" />
    </div>
    <button className="mobile-menu-toggle" aria-label="Toggle menu">
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
    </button>
    <nav className="nav-menu" role="navigation" aria-label="Main navigation">
      <a href="#about">About</a>
      <a href="#menu">Menu</a>
      <a href="#hours">Hours</a>
      <a href="#contact">Contact</a>
      <a href="tel:2765710891" className="phone-link"><FontAwesomeIcon icon={faPhone} /> (276) 571-0891</a>
    </nav>
  </header>
);

export default Header;
