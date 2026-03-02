// CartSidebar.jsx - BB's Bakery & Cafe - Redesigned Cart Component
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const formatDollars = (cents) => `$${(cents / 100).toFixed(2)}`;

const CartSidebar = ({ cart, onUpdateQuantity, onCheckout, isCheckingOut, checkoutError, totalCents }) => {
  if (!cart.length) {
    return (
      <div className="cart-container cart-empty">
        <div className="cart-header">
          <h4 style={{ margin: '0 0 0.5rem 0' }}>
            <FontAwesomeIcon icon={faShoppingCart} /> Your Cart
          </h4>
        </div>
        <div className="cart-empty-state">
          <div className="empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <p className="empty-subtitle">Add items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h4 style={{ margin: 0 }}>
          <FontAwesomeIcon icon={faShoppingCart} /> Your Cart
          <span className="cart-count">{cart.length}</span>
        </h4>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.name} className="cart-item">
            <div className="cart-item-content">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">
                {item.quantity} × {formatDollars(item.amount)}
              </div>
            </div>

            <div className="cart-item-controls">
              <button
                type="button"
                className="cart-qty-btn minus"
                onClick={() => onUpdateQuantity(item.name, -1)}
                aria-label={`Decrease quantity of ${item.name}`}
                title="Remove one"
              >
                −
              </button>
              <span className="cart-qty">{item.quantity}</span>
              <button
                type="button"
                className="cart-qty-btn plus"
                onClick={() => onUpdateQuantity(item.name, 1)}
                aria-label={`Increase quantity of ${item.name}`}
                title="Add one"
              >
                +
              </button>
              <button
                type="button"
                className="cart-remove-btn"
                onClick={() => onUpdateQuantity(item.name, -item.quantity)}
                aria-label={`Remove ${item.name} from cart`}
                title="Remove from cart"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Subtotal</span>
          <span className="total-amount">{formatDollars(totalCents)}</span>
        </div>
        <p className="cart-tax-note">
          Sales tax added at checkout
        </p>

        <button
          type="button"
          onClick={onCheckout}
          disabled={!cart.length || isCheckingOut}
          className="cart-checkout-btn"
        >
          {isCheckingOut ? '🔄 Processing...' : '💳 Checkout'}
        </button>

        {checkoutError && (
          <div className="cart-error">
            <p>{checkoutError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
