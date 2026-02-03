// Contact.jsx - BB's Bakery & Cafe
import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faLocationDot, faPhone, faEnvelope, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const Contact = () => (
  <section id="contact" className="info-section contact-section" aria-labelledby="contact-heading">
    <h2 id="contact-heading"><FontAwesomeIcon icon={faAddressBook} /> Contact</h2>
    <div className="contact-grid" itemScope itemType="https://schema.org/Bakery">
      <p><FontAwesomeIcon icon={faLocationDot} /> <strong>Address:</strong><br /><span itemProp="address" itemScope itemType="https://schema.org/PostalAddress"><span itemProp="streetAddress">103 Main St</span>, <span itemProp="addressLocality">Pennington Gap</span>, <span itemProp="addressRegion">Virginia</span> <span itemProp="postalCode">24277</span></span></p>
      <p><FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong><br /><a href="tel:2765710891" itemProp="telephone">(276) 571-0891</a></p>
      <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong><br /><a href="mailto:bbscafe25@outlook.com" itemProp="email">bbscafe25@outlook.com</a></p>
      <p><FontAwesomeIcon icon={faFacebook} style={{ color: '#1877f2' }} /> <strong>Facebook:</strong><br /><a href="https://www.facebook.com/profile.php?id=61581654642389" target="_blank" rel="noopener noreferrer">Follow us on Facebook</a></p>
    </div>
    <div className="map-container">
      <h3><FontAwesomeIcon icon={faMapLocationDot} /> Find Us</h3>
      <div className="map-wrapper">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.9362687766876!2d-83.02847!3d36.75833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885a7e8c0e0e0e0e%3A0x0!2s103%20Main%20St%2C%20Pennington%20Gap%2C%20VA%2024277!5e0!3m2!1sen!2sus!4v1234567890" 
          width="100%" 
          height="400" 
          style={{ border: 0 }} 
          allowFullScreen=""
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="BB's Bakery & Cafe location map - 103 Main St, Pennington Gap, VA 24277"
        ></iframe>
      </div>
    </div>
  </section>
);

export default Contact;
