// Footer.jsx - BB's Bakery & Cafe
import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    // Set current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }, []);

  return (
    <footer className="footer">
      <p>© <span id="currentYear"></span> BB's Bakery & Cafe — Made with ♥</p>
      <p className="built-by">Built by <a href="https://smithdigitals.com" target="_blank" rel="noopener noreferrer">Smith Digitals</a></p>
    </footer>
  );
};

export default Footer;
