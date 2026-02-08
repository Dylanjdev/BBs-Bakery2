// PreOrder.jsx - BB's Bakery & Cafe
import React, { useState, useEffect } from 'react';

const preorderItems = [
  {
    name: 'Chocolate Covered Strawberries',
    desc: 'Delicious strawberries dipped in chocolate',
    links: [
      { url: 'https://buy.stripe.com/eVq6oH6EE8Ip8MI2UY5sA0A', label: '$17.00 USD per 6 units' },
      { url: 'https://buy.stripe.com/bJefZhbYY6AhaUQ2UY5sA0z', label: '$27.00 USD per 12 units' },
    ],
  },
  {
    name: 'Red Velvet Cookies',
    desc: 'Rich and decadent red velvet cookies',
    links: [
      { url: 'https://buy.stripe.com/cNieVd2oo4s93sobru5sA0q', label: '$13.00 USD per 6 units' },
      { url: 'https://buy.stripe.com/fZuaEXbYYbUB5AweDG5sA0r', label: '$24.00 USD per 12 units' },
    ],
  },
  {
    name: 'Raspberry White Chocolate Scones',
    desc: 'Fresh scones with raspberry & white chocolate',
    links: [
      { url: 'https://buy.stripe.com/eVq5kD1kk7El6EAcvy5sA0t', label: '$13.00 USD per 4 units' },
      { url: 'https://buy.stripe.com/14AfZh4wwf6NaUQ67a5sA0u', label: '$22.00 USD per 8 units' },
      { url: 'https://buy.stripe.com/9B64gze76aQx6EA9jm5sA0v', label: '$33.00 USD per 12 units' },
    ],
  },
  {
    name: 'Strawberry & Chocolate Cream Danishes',
    desc: 'Flaky danishes filled with strawberry & chocolate cream',
    links: [
      { url: 'https://buy.stripe.com/6oU3cvbYY8Ip9QMcvy5sA0x', label: '$26.00 USD per 6 units' },
      { url: 'https://buy.stripe.com/00wdR94wwaQx0gc3Z25sA0y', label: '$52.00 USD per 12 units' },
    ],
  },
  {
    name: "Berries & Cream Croissants",
    desc: "Buttery croissants with fresh berries & cream",
    links: [
      { url: "https://buy.stripe.com/5kQ5kDfba5wdfb69jm5sA0w", label: "$33.00 USD per 6 units" },
    ],
  },
  {
    name: "Valentine's Brownies",
    desc: "Special Valentine's Day themed brownies",
    links: [
      { url: "https://buy.stripe.com/bJecN59QQgaRd2Y9jm5sA0s", label: "$20.00 USD per 6 units" },
    ],
  },
];

const preorderImages = [
  {
    src: '/assets/images/PreOrderMenu.webp',
    alt: 'BB\'s Bakery Pre-Order Menu - Special items available for pre-order',
  },
  {
    src: '/assets/images/PreOrderMenuPrices.webp',
    alt: 'BB\'s Bakery Pre-Order Menu Prices - Pricing for pre-order items',
  },
];

function PreOrder() {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Prevent background scroll when any PreOrder modal is open
  useEffect(() => {
    const shouldLockScroll = modalOpen || imageModalOpen;
    if (shouldLockScroll) {
      const { body, documentElement } = document;
      const previousBodyOverflow = body.style.overflow;
      const previousHtmlOverflow = documentElement.style.overflow;
      body.style.overflow = 'hidden';
      documentElement.style.overflow = 'hidden';

      return () => {
        body.style.overflow = previousBodyOverflow;
        documentElement.style.overflow = previousHtmlOverflow;
      };
    }
  }, [modalOpen, imageModalOpen]);

  return (
    <section 
      id="preorder" 
      className="pv5 mw7 center" 
      style={{padding: 'clamp(2rem, 8vw, 3rem) 1rem'}}
      aria-labelledby="preorder-heading"
    >
      <h2 
        id="preorder-heading" 
        className="f2 fw7 tc mb4" 
        style={{
          fontFamily: 'Playfair Display, serif',
          background: 'linear-gradient(135deg, #d65a8c 0%, #6b8e6f 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.8px',
          fontSize: 'clamp(2rem, 6vw, 2.5rem)',
          marginBottom: '1rem'
        }}
      >
        💝 Pre-Order Available
      </h2>
      
      <p 
        className="f4 fw5 tc mb4 lh-copy" 
        style={{
          color: '#6d6d6d',
          maxWidth: '700px',
          margin: '0 auto 2rem',
          fontFamily: 'Quicksand, sans-serif',
          fontSize: '1.05rem',
          lineHeight: '1.8'
        }}
      >
        Planning something special? Pre-order your favorites and we'll have them ready for you!
      </p>
      
      <div 
        className="pa4 br-pill tc mb5" 
        style={{
          maxWidth: '550px',
          margin: '0 auto 2.5rem',
          background: 'linear-gradient(135deg, #fce7f0 0%, #e8f0e8 100%)',
          border: '2px solid #d65a8c',
          boxShadow: '0 6px 20px rgba(214, 90, 140, 0.15)',
          borderRadius: '50px'
        }}
      >
        <span 
          className="f6 fw6" 
          style={{
            color: '#1a1a1a',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '0.95rem',
            letterSpacing: '0.3px'
          }}
        >
          ℹ️ All prices include 8% tax that goes to the town.
        </span>
      </div>

      {/* Menu Images */}
      <div className="flex flex-wrap justify-center mb5" style={{gap: '1.5rem'}}>
        {preorderImages.map(img => (
          <div 
            key={img.src} 
            className="pointer br4" 
            style={{
              width: '280px',
              boxShadow: '0 8px 30px rgba(214, 90, 140, 0.15)',
              border: '2px solid #d65a8c',
              overflow: 'hidden',
              transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              background: 'white'
            }} 
            onClick={() => {setImageModalOpen(true); setModalImage(img.src);}}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 14px 45px rgba(214, 90, 140, 0.25)'; 
              e.currentTarget.style.transform = 'translateY(-8px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(214, 90, 140, 0.15)'; 
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: '100%',
              overflow: 'hidden',
              borderRadius: '12px',
              marginBottom: '0.75rem'
            }}>
              <img 
                src={img.src} 
                alt={img.alt} 
                className="br3" 
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transition: 'transform 0.35s ease'
                }} 
              />
            </div>
            <div 
              className="f6 tc fw6 pb3" 
              style={{
                color: '#d65a8c',
                fontFamily: 'Quicksand, sans-serif',
                letterSpacing: '0.3px',
                paddingX: '1rem'
              }}
            >
              🔍 Click to Expand
            </div>
          </div>
        ))}
      </div>

      {/* Pre-Order Button */}
      <div className="tc mt4">
        <button 
          className="fw7 pv3 ph6 br-pill pointer white bn" 
          style={{
            fontSize: '1.05rem',
            background: 'linear-gradient(135deg, #d65a8c 0%, #c9a961 100%)',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(214, 90, 140, 0.25)',
            fontFamily: 'Quicksand, sans-serif',
            letterSpacing: '0.3px'
          }} 
          onClick={() => setModalOpen(true)}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)'; 
            e.target.style.boxShadow = '0 12px 40px rgba(214, 90, 140, 0.35)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)'; 
            e.target.style.boxShadow = '0 8px 28px rgba(214, 90, 140, 0.25)';
          }}
        >
          🛒 Pre-Order Now
        </button>
      </div>

      {/* Modal for PreOrder */}
      {modalOpen && (
        <div 
          className="fixed top-0 left-0 w-100 h-100 flex items-center justify-center z-999" 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="br4 pa4 pa5-ns center relative" 
            style={{
              maxWidth: '650px',
              width: '95%',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              background: 'white',
              borderRadius: '24px',
              border: '2px solid #d65a8c'
            }} 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute bn bg-transparent pointer f2" 
              style={{
                right: '1.5rem',
                top: '1.5rem',
                color: '#1a1a1a',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'all 0.2s',
                background: '#f5f5f5',
                fontWeight: '300',
                cursor: 'pointer',
                fontSize: '1.8rem'
              }} 
              onClick={() => setModalOpen(false)}
              onMouseOver={(e) => e.target.style.background = '#e8e8e8'}
              onMouseOut={(e) => e.target.style.background = '#f5f5f5'}
            >
              ×
            </button>
            
            <h2 
              className="f3 fw7 mb4" 
              style={{
                fontFamily: 'Playfair Display, serif',
                color: '#1a1a1a',
                margin: '0 0 1.5rem 0',
                letterSpacing: '-0.3px'
              }}
            >
              🛍️ Pre-Order Menu
            </h2>
            
            <p 
              className="f5 mb4" 
              style={{
                color: '#6d6d6d',
                fontFamily: 'Quicksand, sans-serif',
                margin: '0 0 1.5rem 0'
              }}
            >
              Select an item to pre-order
            </p>
            
            <div 
              className="pa3 br4 tc mb5" 
              style={{
                background: '#fce7f0',
                border: '2px solid #d65a8c',
                borderRadius: '12px'
              }}
            >
              <span 
                className="f6 fw5" 
                style={{
                  color: '#d65a8c',
                  fontFamily: 'Quicksand, sans-serif'
                }}
              >
                ℹ️ All prices include 8% tax that goes to the town.
              </span>
            </div>

            <div className="mt3">
              {preorderItems.map((item) => (
                <div 
                  key={item.name} 
                  className="br4 pa4 mb4" 
                  style={{
                    background: '#fafaf8',
                    border: '1px solid #efefef',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#f5f5f2';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#fafaf8';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h3 
                    className="f4 fw7 mb2" 
                    style={{
                      color: '#1a1a1a',
                      fontFamily: 'Playfair Display, serif',
                      margin: '0 0 0.5rem 0',
                      letterSpacing: '0.2px'
                    }}
                  >
                    {item.name}
                  </h3>
                  <p 
                    className="f5 mb3 lh-copy" 
                    style={{
                      color: '#6d6d6d',
                      fontFamily: 'Quicksand, sans-serif',
                      margin: '0 0 1rem 0'
                    }}
                  >
                    {item.desc}
                  </p>
                  <div className="flex flex-column" style={{gap: '0.6rem'}}>
                    {item.links.map(link => (
                      <a 
                        key={link.url} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={`Purchase ${item.name} - ${link.label}`}
                        className="link fw6 flex items-center pa3 br2 no-underline"
                        style={{
                          transition: 'all 0.25s ease',
                          color: '#ffffff',
                          background: '#d65a8c',
                          fontFamily: 'Quicksand, sans-serif',
                          fontSize: '0.95rem',
                          letterSpacing: '0.2px'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = '#c0478f';
                          e.target.style.transform = 'translateX(4px)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = '#d65a8c';
                          e.target.style.transform = 'translateX(0)';
                        }}
                      >
                        🛒 {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt4 pa4 br4" style={{background: '#e8f0e8', border: '2px solid #6b8e6f'}}>
              <p 
                className="f6" 
                style={{
                  color: '#1a1a1a',
                  margin: '0',
                  fontFamily: 'Quicksand, sans-serif'
                }}
              >
                <span style={{fontSize: '1.2rem', marginRight: '0.5rem'}}>📞</span>
                Or call us at{' '}
                <a 
                  href="tel:2765710891" 
                  className="link no-underline fw7"
                  style={{color: '#6b8e6f', transition: 'opacity 0.2s'}}
                  onMouseOver={(e) => e.target.style.opacity = '0.8'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  (276) 571-0891
                </a>
                {' '}to place your order
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Image Expand */}
      {imageModalOpen && (
        <div 
          className="fixed top-0 left-0 w-100 h-100 flex items-center justify-center z-999" 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={() => setImageModalOpen(false)}
        >
          <div 
            className="br4 pa3 center relative" 
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              background: 'white',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }} 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute bn pointer" 
              style={{
                right: '1rem',
                top: '1rem',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'white',
                color: '#1a1a1a',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                fontSize: '1.8rem',
                fontWeight: '300',
                transition: 'all 0.2s',
                border: 'none'
              }} 
              onClick={() => setImageModalOpen(false)}
              onMouseOver={(e) => {
                e.target.style.background = '#f5f5f5';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
            <img 
              src={modalImage} 
              alt="Expanded view" 
              className="br3" 
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                display: 'block',
                borderRadius: '12px'
              }} 
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default PreOrder;
