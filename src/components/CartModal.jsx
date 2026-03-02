// CartModal.jsx - BB's Bakery & Cafe - Cart Modal Component
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';

const formatDollars = (cents) => `$${(cents / 100).toFixed(2)}`;

const CartModal = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onCheckout, 
  isCheckingOut, 
  checkoutError, 
  totalCents 
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h3>
            <FontAwesomeIcon icon={faShoppingCart} /> Your Cart
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </h3>
          <button 
            className="cart-modal-close" 
            onClick={onClose}
            aria-label="Close cart"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="cart-modal-body">
          {!cart.length ? (
            <div className="cart-empty-state">
              <div className="empty-icon">🛒</div>
              <p>Your cart is empty</p>
              <p className="empty-subtitle">Browse our menu and add items!</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
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
                      >
                        −
                      </button>
                      <span className="cart-qty">{item.quantity}</span>
                      <button
                        type="button"
                        className="cart-qty-btn plus"
                        onClick={() => onUpdateQuantity(item.name, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() => onUpdateQuantity(item.name, -item.quantity)}
                        aria-label={`Remove ${item.name} from cart`}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
