// Menu.jsx - BB's Bakery & Cafe

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faMugHot, faCookie, faBlender, faStar } from '@fortawesome/free-solid-svg-icons';

const Menu = () => (
  <section id="menu" className="info-section menu-section" aria-labelledby="menu-heading">
    <header className="menu-header">
      <h2 id="menu-heading">Our Menu</h2>
      <p className="tagline">Bringing the best bites to your day</p>
    </header>
    <div className="menu-divider"></div>
    {/* Baked Goods */}
    <div className="menu-content" style={{ display: 'block' }}>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.3rem', marginBottom: 30, color: 'var(--dark-green)', fontWeight: 700, textAlign: 'center', paddingBottom: 20, borderBottom: '2px solid var(--green)' }}>
        <FontAwesomeIcon icon={faCakeCandles} style={{ marginRight: 12, color: 'var(--green)' }} /> Baked Goods
      </h3>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="menu-special">
          <h4>Special of the Day</h4>
          <ul>
            <li data-day="0">Sunday – Closed</li>
            <li data-day="1"><FontAwesomeIcon icon={faStar} /> Monday – Croissants</li>
            <li data-day="2"><FontAwesomeIcon icon={faMugHot} /> Tuesday – $10 Coffee Cake & Small/Medium Coffee (Hot or Iced)</li>
            <li data-day="3"><FontAwesomeIcon icon={faCookie} /> Wednesday – Danishes</li>
            <li data-day="4"><FontAwesomeIcon icon={faBlender} /> Thursday – $7 Frappee</li>
            <li data-day="6"><FontAwesomeIcon icon={faStar} /> Saturday – Baker's Choice</li>
          </ul>
        </div>
        <div className="menu-item">
          <div>
            <h4>Muffins</h4>
            <p>flour + butter + eggs + sugar + fruit variety</p>
          </div>
          <span className="price">$4.00</span>
        </div>
        <div className="menu-item">
          <div>
            <h4>Brownies</h4>
            <p>flour + cocoa powder + eggs + sugar + milk</p>
          </div>
          <span className="price">$3.50</span>
        </div>
        <div className="menu-item">
          <div>
            <h4>Scones</h4>
            <p>flour + butter + eggs + buttermilk + fruit variety</p>
          </div>
          <span className="price">$3.50</span>
        </div>
        <div className="menu-item">
          <div>
            <h4>Cinnamon Rolls</h4>
            <p>flour + butter + milk + eggs + cinnamon + sugar</p>
          </div>
          <span className="price">$5.00</span>
        </div>
        <div className="menu-item">
          <div>
            <h4>Coffee Cake</h4>
            <p>flour + butter + eggs + sugar + cinnamon streusel</p>
          </div>
          <span className="price">$4.50 <small style={{ opacity: 0.8, fontSize: '0.85em' }}>/slice</small></span>
        </div>
      </div>
    </div>
    <div className="menu-divider"></div>
    {/* More menu sections would go here, following the same pattern */}
    <div className="menu-footer-note">
      <p>Please speak with any of our baristas for clarifications over allergens and intolerances.</p>
    </div>
  </section>
);

export default Menu;
