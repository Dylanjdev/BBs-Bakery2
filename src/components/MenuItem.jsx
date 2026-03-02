// MenuItem.jsx - BB's Bakery & Cafe - Menu Item Card Component
import React from 'react';

const MenuItem = ({ item, onAddToCart, category }) => {
  // Generate a consistent, fancy placeholder based on item name
  const getPlaceholderGradient = (name) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradients = [
      'linear-gradient(135deg, #fce7f0 0%, #f5e6d3 100%)',
      'linear-gradient(135deg, #e8f0e8 0%, #fff4e6 100%)',
      'linear-gradient(135deg, #fef3c7 0%, #fce7f0 100%)',
      'linear-gradient(135deg, #dbeafe 0%, #e8f0e8 100%)',
      'linear-gradient(135deg, #f3e8ff 0%, #fce7f0 100%)',
      'linear-gradient(135deg, #ecfdf5 0%, #f5e6d3 100%)',
    ];
    return gradients[hash % gradients.length];
  };

  const getPlaceholderEmoji = (category, name) => {
    const emojiMap = {
      'Baked Goods': ['🧁', '🥐', '🍪', '🎂', '🥖', '🍰'],
      'Breakfast': ['🍳', '🌯', '🥪', '🍞', '🧈', '🥞'],
      'Loaded Energy': ['⚡', '🔋', '💪', '✨', '🚀', '💥'],
      'Specialty Coffee': ['☕', '🫖', '☕', '🧋', '🫗', '🍶'],
    };
    const categoryEmojis = emojiMap[category] || ['✨', '🎁', '🌟', '💫', '⭐', '🎨'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return categoryEmojis[hash % categoryEmojis.length];
  };

  const placeholder = getPlaceholderEmoji(category, item.name);
  const gradient = getPlaceholderGradient(item.name);

  return (
    <div className="menu-item-card">
      <div
        className="menu-item-image"
        style={{ background: gradient }}
      >
        <div className="menu-item-emoji">{placeholder}</div>
      </div>

      <div className="menu-item-details">
        <h5 className="menu-item-title">{item.name}</h5>
        {item.description && (
          <p className="menu-item-description">{item.description}</p>
        )}
        <div className="menu-item-footer">
          <span className="menu-item-price">{item.label}</span>
          <button
            type="button"
            className="menu-item-add-btn"
            onClick={() => onAddToCart(item)}
            title={`Add ${item.name} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
