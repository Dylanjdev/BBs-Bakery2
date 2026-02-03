// Hero.jsx - BB's Bakery & Cafe
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

const Hero = () => (
  <section className="hero" aria-label="Welcome banner">
    <div className="cover-photo">
      <img src="/assets/images/CoverPhoto.jpg" alt="Fresh baked pastries and breads at BB's Bakery & Cafe in Pennington Gap, Virginia" width="1200" height="600" fetchpriority="high" />
    </div>
    <div className="hero-content">
      <h1>Welcome to BB's Bakery & Cafe</h1>
      <p className="hero-subtitle">Fresh-baked goodness made with love every morning</p>
      <p className="hero-location"><FontAwesomeIcon icon={faLocationDot} /> Pennington Gap, Virginia</p>
      <div className="hero-buttons">
        <a href="#menu" className="btn btn-primary">View Menu</a>
        <a href="tel:2765710891" className="btn btn-secondary" aria-label="Call BB's Bakery"><FontAwesomeIcon icon={faPhone} /> Order Now</a>
        <a href="#preorder" className="btn btn-valentine"><FontAwesomeIcon icon={faHeart} /> Pre-Order Valentine Menu</a>
        <a href="#croissants" className="btn btn-secondary"><FontAwesomeIcon icon={faStar} /> National Croissant Day Pre-Order</a>
      </div>
    </div>
  </section>
);

export default Hero;
