// About.jsx - BB's Bakery & Cafe
import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faWheatAwn, faMugHot } from '@fortawesome/free-solid-svg-icons';

const About = () => (
  <section id="about" className="info-section about-section" aria-labelledby="about-heading">
    <h2 id="about-heading"><FontAwesomeIcon icon={faHeart} /> About Us</h2>
    <p className="about-intro">At BB's Bakery & Cafe, we believe every morning deserves something special. That's why we bake fresh pastries, breads, and treats daily, using quality ingredients and time-honored recipes.</p>
    <div className="about-highlights">
      <div className="highlight">
        <FontAwesomeIcon icon={faClock} />
        <h3>Fresh Daily</h3>
        <p>Everything baked fresh each morning</p>
      </div>
      <div className="highlight">
        <FontAwesomeIcon icon={faWheatAwn} />
        <h3>Quality Ingredients</h3>
        <p>Only the finest, freshest ingredients</p>
      </div>
      <div className="highlight">
        <FontAwesomeIcon icon={faMugHot} />
        <h3>Amazing Coffee</h3>
        <p>Perfectly brewed every time</p>
      </div>
    </div>
  </section>
);

export default About;
