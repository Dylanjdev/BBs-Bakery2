// Menu.jsx - BB's Bakery & Cafe

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faEgg, faBolt, faCoffee } from '@fortawesome/free-solid-svg-icons';
import '../menu.css';

const Menu = () => (
  <section id="menu" className="menu-section" aria-labelledby="menu-heading">
    <header className="menu-header">
      <h2 id="menu-heading">🍰 Our Menu</h2>
      <p className="tagline">Bringing the best bites to your day</p>
    </header>

    <div className="menu-divider"></div>

    <div className="menu-content">
      {/* Baked Goods */}
      <div className="menu-column">
        <h3><FontAwesomeIcon icon={faCakeCandles} /> Baked Goods</h3>
        
        <div className="menu-special">
          <h4>✨ Special of the Day</h4>
          <ul>
            <li><i className="fa-solid fa-circle-xmark"></i> Sunday – Closed</li>
            <li><i className="fa-solid fa-croissant"></i> Monday – Croissants</li>
            <li><i className="fa-solid fa-mug-hot"></i> Tuesday – $10 Coffee Cake & Small/Medium Coffee (Hot or Iced)</li>
            <li><i className="fa-solid fa-cookie"></i> Wednesday – Danishes</li>
            <li><i className="fa-solid fa-blender"></i> Thursday – $7 Frappee</li>
            <li><i className="fa-solid fa-star"></i> Saturday – Baker's Choice</li>
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
          <span className="price">$4.50<small style={{opacity: 0.7, fontSize: '0.85em'}}>/slice</small></span>
        </div>
      </div>

      {/* Breakfast */}
      <div className="menu-column">
        <h3><FontAwesomeIcon icon={faEgg} /> Breakfast</h3>

        <div className="menu-item">
          <div>
            <h4>Savory Biscuit</h4>
            <p>choice of protein + cheese + egg</p>
          </div>
          <span className="price">$5.50</span>
        </div>

        <div className="menu-item">
          <div>
            <h4>Breakfast Sandwich</h4>
            <p>choice of protein + cheese + two eggs</p>
          </div>
          <span className="price">$7.00</span>
        </div>

        <div className="menu-item">
          <div>
            <h4>Breakfast Wrap</h4>
            <p>choice of protein + cheese + two eggs</p>
          </div>
          <span className="price">$8.00</span>
        </div>

        <div className="menu-item">
          <div>
            <h4>Omelette</h4>
            <p>choice of protein + cheese + four eggs</p>
          </div>
          <span className="price">$8.00</span>
        </div>
      </div>
    </div>

    {/* Loaded Energy & Specialty Coffee */}
    <div className="menu-content">
      <div className="menu-column">
        <h3><FontAwesomeIcon icon={faBolt} /> Loaded Energy</h3>

        <div className="menu-item">
          <div>
            <h4>Tater Colada</h4>
            <p>energy + blue raspberry + coconut + vanilla + lemonade</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Blushing Belle</h4>
            <p>energy + peach + raspberry + vanilla + grenadine + lemonade</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Rip-Tide</h4>
            <p>energy + dragonfruit + pomegranate + blue curacao + lemonade</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Wrecking Ball</h4>
            <p>energy + blackberry + raspberry + vanilla bean + sours</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Fruit Roll-Up</h4>
            <p>energy + grenadine + pomegranate + strawberry + sours</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>BB's Fav</h4>
            <p>energy + vanilla + blue raspberry + cold foam</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Honey's Tropical Tumble</h4>
            <p>energy + strawberry + banana + pineapple + sours</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Smokin' Ash</h4>
            <p>energy + blackberry + lime + lemonade</p>
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '30px', padding: '15px', background: 'rgba(151, 185, 138, 0.15)', borderRadius: '50px', border: '2px solid var(--green)'}}>
          <p style={{margin: 0, fontWeight: 700, fontSize: '1.1rem'}}>32 oz • $8.00</p>
        </div>
      </div>

      <div className="menu-column">
        <h3><FontAwesomeIcon icon={faCoffee} /> Specialty Coffee</h3>

        <div className="menu-item">
          <div>
            <h4>Tiramisu</h4>
            <p>mocha + espresso + mascarpone cheese mixture + cold foam + chocolate drizzle</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Cookies & Cream</h4>
            <p>white chocolate vanilla + espresso + oreo cream mixture + chocolate drizzle</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Smore's</h4>
            <p>mocha + espresso + brown sugar + marshmallow fluff mixture + chocolate drizzle</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>White Chocolate Raspberry</h4>
            <p>white chocolate + espresso + raspberry cold foam</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Caramel Kolb</h4>
            <p>caramel base + espresso + brown sugar + cookie mixture + caramel drizzle</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Cinnamon Roll</h4>
            <p>cream cheese icing base + cinnamon + brown sugar + espresso + cheesecake + vanilla</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Conor McGregor</h4>
            <p>caramel + espresso + irish cream + brown sugar</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Blackstone</h4>
            <p>vanilla + caramel + brown sugar + espresso</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Peppermint Mocha</h4>
            <p>espresso + peppermint + mocha + chocolate drizzle</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Caramel Toast Crunch</h4>
            <p>espresso + caramel + brown sugar, CTC powder + caramel drizzle</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>White Nut</h4>
            <p>espresso + almond milk + vanilla + white chocolate drizzle</p>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Mocha Nut</h4>
            <p>coconut mocha + espresso + almond milk + chocolate drizzle</p>
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '30px', padding: '15px', background: 'rgba(151, 185, 138, 0.15)', borderRadius: '50px', border: '2px solid var(--green)'}}>
          <p style={{margin: 0, fontWeight: 700, fontSize: '1.1rem'}}>12 oz • $5.50 | 20 oz • $6.50 | 32 oz • $7.50</p>
        </div>
      </div>
    </div>

    <div className="menu-footer-note">
      Please speak with any of our baristas for clarifications over allergens and intolerances.
    </div>
  </section>
);

export default Menu;
