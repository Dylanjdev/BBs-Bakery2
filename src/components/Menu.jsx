// Menu.jsx - BB's Bakery & Cafe
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faEgg, faBolt, faCoffee, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../menu.css';
import '../cart.css';
import { squareVariationMap } from '../data/squareVariationMap';

// Menu items with online ordering available
const onlineOrderPrices = {
  'Muffins': { amount: 400, label: '$4.00' },
  'Brownies': { amount: 300, label: '$3.00' },
  'Scones': { amount: 350, label: '$3.50' },
  'Cinnamon Rolls': { amount: 500, label: '$5.00' },
  'Coffee Cake (Slice)': { amount: 450, label: '$4.50' },
  'Cream Horns': { amount: 450, label: '$4.50' },
  'Savory Biscuit': { amount: 550, label: '$5.50' },
  'Breakfast Sandwich': { amount: 700, label: '$7.00' },
  'Breakfast Wrap': { amount: 800, label: '$8.00' },
  'Omelette': { amount: 800, label: '$8.00' },
  'Tater Colada (32 oz)': { amount: 800, label: '$8.00' },
  'Blushing Belle (32 oz)': { amount: 800, label: '$8.00' },
  'Rip-Tide (32 oz)': { amount: 800, label: '$8.00' },
  'Wrecking Ball (32 oz)': { amount: 800, label: '$8.00' },
  'Fruit Roll-Up (32 oz)': { amount: 800, label: '$8.00' },
  "BB's Fav (32 oz)": { amount: 800, label: '$8.00' },
  "Honey's Tropical Tumble (32 oz)": { amount: 800, label: '$8.00' },
  "Smokin' Ash (32 oz)": { amount: 800, label: '$8.00' },
  'Tiramisu (20 oz)': { amount: 650, label: '$6.50' },
  'Cookies & Cream (20 oz)': { amount: 650, label: '$6.50' },
  "Smore's (20 oz)": { amount: 650, label: '$6.50' },
  'White Chocolate Raspberry (20 oz)': { amount: 650, label: '$6.50' },
  'Caramel Kolb (20 oz)': { amount: 650, label: '$6.50' },
  'Cinnamon Roll (20 oz)': { amount: 650, label: '$6.50' },
  'Conor McGregor (20 oz)': { amount: 650, label: '$6.50' },
  'Blackstone (20 oz)': { amount: 650, label: '$6.50' },
  'Peppermint Mocha (20 oz)': { amount: 650, label: '$6.50' },
  'Caramel Toast Crunch (20 oz)': { amount: 650, label: '$6.50' },
  'White Nut (20 oz)': { amount: 650, label: '$6.50' },
  'Mocha Nut (20 oz)': { amount: 650, label: '$6.50' },
  'Specialty Coffee (12 oz)': { amount: 550, label: '$5.50' },
  'Specialty Coffee (20 oz)': { amount: 650, label: '$6.50' },
  'Specialty Coffee (32 oz)': { amount: 750, label: '$7.50' },
  'Americano': { amount: 400, label: '$4.00' },
  'Cappuccino': { amount: 450, label: '$4.50' },
  'Cortado': { amount: 450, label: '$4.50' },
  'Iced Latte (16 oz)': { amount: 550, label: '$5.50' },
  'Iced Latte (20 oz)': { amount: 650, label: '$6.50' },
  'Iced Latte (32 oz)': { amount: 750, label: '$7.50' },
  'Hot Latte (12 oz)': { amount: 500, label: '$5.00' },
  'Hot Latte (20 oz)': { amount: 600, label: '$6.00' },
  'Frappe (16 oz)': { amount: 600, label: '$6.00' },
  'Frappe (20 oz)': { amount: 700, label: '$7.00' },
  'Frappe (32 oz)': { amount: 800, label: '$8.00' },
  'Dirty Soda & Lemonade (16 oz)': { amount: 500, label: '$5.00' },
  'Dirty Soda & Lemonade (20 oz)': { amount: 600, label: '$6.00' },
  'Dirty Soda & Lemonade (32 oz)': { amount: 700, label: '$7.00' },
  'Smoothie (16 oz)': { amount: 600, label: '$6.00' },
  'Smoothie (20 oz)': { amount: 700, label: '$7.00' },
  'Smoothie (32 oz)': { amount: 800, label: '$8.00' },
};

const Menu = ({ onAddToCart, orderingStatus }) => {
  const handleAddToCart = (name) => {
    const priceData = onlineOrderPrices[name];
    if (priceData) {
      onAddToCart({
        name,
        amount: priceData.amount,
        label: priceData.label,
        variationId: squareVariationMap[name] || null
      });
    }
  };

  return (
  <section id="menu" className="menu-section" aria-labelledby="menu-heading">
    {!orderingStatus?.isOrderingAllowed && (
      <div style={{
        background: 'linear-gradient(135deg, #ffe6ec 0%, #fff0f7 100%)',
        border: '2px solid #d65a8c',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(214, 90, 140, 0.15)'
      }}>
        <p style={{
          margin: '0',
          fontSize: '1.05rem',
          fontWeight: '600',
          color: '#d65a8c',
          fontFamily: 'Playfair Display, serif'
        }}>
          ⏰ Ordering Currently Closed
        </p>
        <p style={{
          margin: '0.75rem 0 0 0',
          fontSize: '0.95rem',
          color: '#666'
        }}>
          {orderingStatus?.message || 'Orders are not available at this time.'}
        </p>
      </div>
    )}
    
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
            <li><i className="fa-solid fa-bread-slice"></i> Monday – Croissants</li>
            <li><i className="fa-solid fa-mug-hot"></i> Tuesday – $10 Coffee Cake & Small/Medium Coffee (Hot or Iced)</li>
            <li><i className="fa-solid fa-cookie"></i> Wednesday – Danishes</li>
            <li><i className="fa-solid fa-blender"></i> Thursday – $7 Frappee</li>
            <li><i className="fa-solid fa-egg"></i> Friday – Quiche Day</li>
            <li><i className="fa-solid fa-star"></i> Saturday – Baker's Choice</li>
          </ul>
        </div>

        <div className="menu-item">
          <div>
            <h4>Muffins</h4>
            <p>flour + butter + eggs + sugar + fruit variety</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$4.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Muffins')}
              aria-label="Add Muffins to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Brownies</h4>
            <p>flour + cocoa powder + eggs + sugar + milk</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$3.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Brownies')}
              aria-label="Add Brownies to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Scones</h4>
            <p>flour + butter + eggs + buttermilk + fruit variety</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$3.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Scones')}
              aria-label="Add Scones to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Cinnamon Rolls</h4>
            <p>flour + butter + milk + eggs + cinnamon + sugar</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$5.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Cinnamon Rolls')}
              aria-label="Add Cinnamon Rolls to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Coffee Cake</h4>
            <p>flour + butter + eggs + sugar + cinnamon streusel</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$4.50<small style={{opacity: 0.7, fontSize: '0.85em'}}>/slice</small></span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Coffee Cake (Slice)')}
              aria-label="Add Coffee Cake to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Cream Horns</h4>
            <p>flaky pastry + sweet cream filling</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$4.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Cream Horns')}
              aria-label="Add Cream Horns to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
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
          <div className="menu-item-actions">
            <span className="price">$5.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Savory Biscuit')}
              aria-label="Add Savory Biscuit to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Breakfast Sandwich</h4>
            <p>choice of protein + cheese + two eggs</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$7.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Breakfast Sandwich')}
              aria-label="Add Breakfast Sandwich to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Breakfast Wrap</h4>
            <p>choice of protein + cheese + two eggs</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$8.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Breakfast Wrap')}
              aria-label="Add Breakfast Wrap to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Omelette</h4>
            <p>choice of protein + cheese + four eggs</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$8.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Omelette')}
              aria-label="Add Omelette to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
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
          <div className="menu-item-actions">
            <span className="price">$8.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Tater Colada (32 oz)')}
              aria-label="Add Tater Colada to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Blushing Belle</h4>
            <p>energy + peach + raspberry + vanilla + grenadine + lemonade</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$8.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Blushing Belle (32 oz)')}
              aria-label="Add Blushing Belle to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Rip-Tide</h4>
            <p>energy + dragonfruit + pomegranate + blue curacao + lemonade</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$8.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Rip-Tide (32 oz)')}
              aria-label="Add Rip-Tide to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Wrecking Ball</h4>
            <p>energy + blackberry + raspberry + vanilla bean + sours</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$8.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Wrecking Ball (32 oz)')}
              aria-label="Add Wrecking Ball to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Fruit Roll-Up</h4>
            <p>energy + grenadine + pomegranate + strawberry + sours</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$8.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Fruit Roll-Up (32 oz)')}
              aria-label="Add Fruit Roll-Up to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>BB's Fav</h4>
            <p>energy + vanilla + blue raspberry + cold foam</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$8.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart("BB's Fav (32 oz)")}
              aria-label="Add BB's Fav to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Honey's Tropical Tumble</h4>
            <p>energy + strawberry + banana + pineapple + sours</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$8.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart("Honey's Tropical Tumble (32 oz)")}
              aria-label="Add Honey's Tropical Tumble to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Smokin' Ash</h4>
            <p>energy + blackberry + lime + lemonade</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$8.00</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart("Smokin' Ash (32 oz)")}
              aria-label="Add Smokin' Ash to cart"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
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
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Tiramisu (20 oz)')}
              aria-label="Add Tiramisu to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Cookies & Cream</h4>
            <p>white chocolate vanilla + espresso + oreo cream mixture + chocolate drizzle</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Cookies & Cream (20 oz)')}
              aria-label="Add Cookies & Cream to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Smore's</h4>
            <p>mocha + espresso + brown sugar + marshmallow fluff mixture + chocolate drizzle</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart("Smore's (20 oz)")}
              aria-label="Add Smore's to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>White Chocolate Raspberry</h4>
            <p>white chocolate + espresso + raspberry cold foam</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('White Chocolate Raspberry (20 oz)')}
              aria-label="Add White Chocolate Raspberry to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Caramel Kolb</h4>
            <p>caramel base + espresso + brown sugar + cookie mixture + caramel drizzle</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Caramel Kolb (20 oz)')}
              aria-label="Add Caramel Kolb to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Cinnamon Roll</h4>
            <p>cream cheese icing base + cinnamon + brown sugar + espresso + cheesecake + vanilla</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Cinnamon Roll (20 oz)')}
              aria-label="Add Cinnamon Roll to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Conor McGregor</h4>
            <p>caramel + espresso + irish cream + brown sugar</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Conor McGregor (20 oz)')}
              aria-label="Add Conor McGregor to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Blackstone</h4>
            <p>vanilla + caramel + brown sugar + espresso</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Blackstone (20 oz)')}
              aria-label="Add Blackstone to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Peppermint Mocha</h4>
            <p>espresso + peppermint + mocha + chocolate drizzle</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Peppermint Mocha (20 oz)')}
              aria-label="Add Peppermint Mocha to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Caramel Toast Crunch</h4>
            <p>espresso + caramel + brown sugar, CTC powder + caramel drizzle</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Caramel Toast Crunch (20 oz)')}
              aria-label="Add Caramel Toast Crunch to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>White Nut</h4>
            <p>espresso + almond milk + vanilla + white chocolate drizzle</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('White Nut (20 oz)')}
              aria-label="Add White Nut to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="menu-item">
          <div>
            <h4>Mocha Nut</h4>
            <p>coconut mocha + espresso + almond milk + chocolate drizzle</p>
          </div>
          <div className="menu-item-actions">
            <span className="price">$6.50</span>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart('Mocha Nut (20 oz)')}
              aria-label="Add Mocha Nut to cart"
              title="20oz"
              disabled={!orderingStatus?.isOrderingAllowed}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>

      {/* Coffee & Beverages Row */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(1.5rem, 4vw, 2.5rem)', marginTop: 'clamp(2rem, 6vw, 4rem)'}}>
        {/* Classic Espresso Section */}
        <div className="menu-column">
          <h3><FontAwesomeIcon icon={faCoffee} /> Classic Espresso</h3>

          <div className="menu-item">
            <div>
              <h4>Americano</h4>
              <p>espresso + hot water</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$4.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Americano')}
                aria-label="Add Americano to cart"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="menu-item">
            <div>
              <h4>Cappuccino</h4>
              <p>espresso + steamed milk + foam</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$4.50</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Cappuccino')}
                aria-label="Add Cappuccino to cart"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="menu-item">
            <div>
              <h4>Cortado</h4>
              <p>espresso + equal parts steamed milk</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$4.50</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Cortado')}
                aria-label="Add Cortado to cart"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>

        {/* Iced Latte Section */}
        <div className="menu-column">
          <h3><FontAwesomeIcon icon={faCoffee} /> Iced Latte</h3>

          <div className="menu-item">
            <div>
              <h4>Iced Latte</h4>
              <p>espresso + cold milk + ice</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$5.50</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Iced Latte (16 oz)')}
                aria-label="Add Iced Latte to cart"
                title="16oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="menu-item">
            <div>
              <h4>Iced Latte</h4>
              <p>espresso + cold milk + ice</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$6.50</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Iced Latte (20 oz)')}
                aria-label="Add Iced Latte to cart"
                title="20oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="menu-item">
            <div>
              <h4>Iced Latte</h4>
              <p>espresso + cold milk + ice</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$7.50</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Iced Latte (32 oz)')}
                aria-label="Add Iced Latte to cart"
                title="32oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>

        {/* Hot Latte Section */}
        <div className="menu-column">
          <h3><FontAwesomeIcon icon={faCoffee} /> Hot Latte</h3>

          <div className="menu-item">
            <div>
              <h4>Hot Latte</h4>
              <p>espresso + steamed milk</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$5.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Hot Latte (12 oz)')}
                aria-label="Add Hot Latte to cart"
                title="12oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="menu-item">
            <div>
              <h4>Hot Latte</h4>
              <p>espresso + steamed milk</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$6.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Hot Latte (20 oz)')}
                aria-label="Add Hot Latte to cart"
                title="20oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>

        {/* Frappes Section */}
        <div className="menu-column">
          <h3><FontAwesomeIcon icon={faCoffee} /> Frappes</h3>

          <div className="menu-item">
            <div>
              <h4>Frappe</h4>
              <p>blended espresso + ice + milk</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$6.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Frappe (16 oz)')}
                aria-label="Add Frappe to cart"
                title="16oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="menu-item">
            <div>
              <h4>Frappe</h4>
              <p>blended espresso + ice + milk</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$7.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Frappe (20 oz)')}
                aria-label="Add Frappe to cart"
                title="20oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="menu-item">
            <div>
              <h4>Frappe</h4>
              <p>blended espresso + ice + milk</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$8.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Frappe (32 oz)')}
                aria-label="Add Frappe to cart"
                title="32oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>

        {/* Dirty Sodas & Lemonades Section */}
        <div className="menu-column">
          <h3>💥 Dirty Sodas & Lemonades</h3>

          <div className="menu-item">
            <div>
              <h4>Dirty Soda & Lemonade</h4>
              <p>soda + syrup + lemonade blend</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$5.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Dirty Soda & Lemonade (16 oz)')}
                aria-label="Add Dirty Soda & Lemonade to cart"
                title="16oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="menu-item">
            <div>
              <h4>Dirty Soda & Lemonade</h4>
              <p>soda + syrup + lemonade blend</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$6.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Dirty Soda & Lemonade (20 oz)')}
                aria-label="Add Dirty Soda & Lemonade to cart"
                title="20oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="menu-item">
            <div>
              <h4>Dirty Soda & Lemonade</h4>
              <p>soda + syrup + lemonade blend</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$7.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Dirty Soda & Lemonade (32 oz)')}
                aria-label="Add Dirty Soda & Lemonade to cart"
                title="32oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>

        {/* Smoothies Section */}
        <div className="menu-column">
          <h3>🍓 Smoothies</h3>

          <div className="menu-item">
            <div>
              <h4>Smoothie</h4>
              <p>fresh fruit + yogurt + ice blend</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$6.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Smoothie (16 oz)')}
                aria-label="Add Smoothie to cart"
                title="16oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="menu-item">
            <div>
              <h4>Smoothie</h4>
              <p>fresh fruit + yogurt + ice blend</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$7.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Smoothie (20 oz)')}
                aria-label="Add Smoothie to cart"
                title="20oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="menu-item">
            <div>
              <h4>Smoothie</h4>
              <p>fresh fruit + yogurt + ice blend</p>
            </div>
            <div className="menu-item-actions">
              <span className="price">$8.00</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart('Smoothie (32 oz)')}
                aria-label="Add Smoothie to cart"
                title="32oz"
                disabled={!orderingStatus?.isOrderingAllowed}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="menu-footer-note">
      Please speak with any of our baristas for clarifications over allergens and intolerances.
    </div>
  </section>
);
};

export default Menu;
