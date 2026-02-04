// Hero.jsx - BB's Bakery & Cafe
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faHeart } from '@fortawesome/free-solid-svg-icons';

const Hero = () => (
  <section 
    className="relative" 
    aria-label="Welcome banner"
    style={{
      background: 'linear-gradient(135deg, rgba(252, 231, 240, 0.3) 0%, rgba(232, 240, 232, 0.2) 100%)',
      paddingTop: 'clamp(1.5rem, 8vw, 4rem)',
      paddingBottom: 'clamp(1.5rem, 8vw, 4rem)',
      borderRadius: '32px',
      margin: 'clamp(1rem, 4vw, 2rem) auto',
      maxWidth: '1400px'
    }}
  >
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)',
      gap: 'clamp(1.5rem, 4vw, 3rem)',
      alignItems: 'center',
      padding: 'clamp(1rem, 4vw, 2.5rem)',
      maxWidth: '100%'
    }} className="hero-grid">
      {/* Hero Image */}
      <div 
        className="br4 overflow-hidden relative order-2-ns" 
        style={{
          boxShadow: '0 20px 60px rgba(214, 90, 140, 0.25)',
          borderRadius: '28px',
          border: 'none',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          height: 'clamp(300px, 35vw, 450px)',
          minHeight: '300px',
          order: 2,
          width: '100%'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = '0 30px 80px rgba(214, 90, 140, 0.4)';
          e.currentTarget.style.transform = 'translateY(-8px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(214, 90, 140, 0.25)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            background: '#f9f9f9'
          }}
        >
          <img 
            src="/assets/images/CoverPhoto.webp" 
            alt="Fresh baked pastries and breads at BB's Bakery & Cafe in Pennington Gap, Virginia" 
            width="1200" 
            height="600" 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              transition: 'transform 0.4s ease',
              filter: 'brightness(1.05) contrast(1.08)'
            }} 
            fetchPriority="high"
            decoding="async"
            onMouseOver={(e) => {
              e.style.transform = 'scale(1.03)';
            }}
            onMouseOut={(e) => {
              e.style.transform = 'scale(1)';
            }}
          />
          {/* Overlay gradient for depth */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(214, 90, 140, 0.1) 0%, rgba(107, 142, 111, 0.05) 100%)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div style={{order: 1}}>
        <h1 
          className="f1 f-headline-l fw7 mb3 mt0 lh-title" 
          style={{
            fontFamily: 'Playfair Display, serif',
            color: '#1a1a1a',
            letterSpacing: '-1.5px',
            fontSize: 'clamp(2rem, 10vw, 5rem)',
            background: 'linear-gradient(135deg, #d65a8c 0%, #6b8e6f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'left',
            margin: '0 0 1rem 0'
          }}
        >
          BB's Bakery & Cafe
        </h1>
        
        <p 
          className="fw5 mb3" 
          style={{
            color: '#6d6d6d',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(0.95rem, 4vw, 1.15rem)',
            letterSpacing: '0.5px',
            fontWeight: '500',
            lineHeight: '1.8',
            textAlign: 'left',
            margin: '0 0 1.5rem 0'
          }}
        >
          🍰 Fresh-baked goodness made with love every morning 🧁
        </p>
        
        <p 
          className="fw5 mb5 flex items-center"
          style={{
            color: '#8d8d8d',
            fontSize: '1rem',
            gap: '0.5rem',
            textAlign: 'left',
            alignItems: 'center'
          }}
        >
          <FontAwesomeIcon icon={faLocationDot} style={{color: '#d65a8c', fontSize: '1.1rem', flexShrink: 0}} /> 
          Pennington Gap, Virginia
        </p>
        
        {/* CTA Buttons */}
        <div 
          className="flex flex-wrap items-center" 
          style={{gap: 'clamp(0.5rem, 2vw, 1rem)', justifyContent: 'flex-start'}}
        >
          <a 
            href="#menu" 
            className="fw6 pv3 ph5 br-pill dib no-underline" 
            style={{
              transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              fontSize: 'clamp(0.85rem, 3vw, 1rem)',
              padding: 'clamp(0.6rem, 3vw, 0.75rem) clamp(1rem, 4vw, 1.25rem)',
              background: 'linear-gradient(135deg, #d65a8c 0%, #c9a961 100%)',
              color: 'white',
              border: 'none',
              boxShadow: '0 6px 24px rgba(214, 90, 140, 0.25)',
              letterSpacing: '0.3px',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 10px 36px rgba(214, 90, 140, 0.35)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 24px rgba(214, 90, 140, 0.25)';
            }}
          >
            🎂 View Menu
          </a>
          
          <a 
            href="tel:2765710891" 
            className="fw6 pv3 ph5 br-pill dib no-underline white" 
            aria-label="Call BB's Bakery" 
            style={{
              transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              fontSize: 'clamp(0.85rem, 3vw, 1rem)',
              padding: 'clamp(0.6rem, 3vw, 0.75rem) clamp(1rem, 4vw, 1.25rem)',
              background: 'linear-gradient(135deg, #6b8e6f 0%, #a7d5ab 100%)',
              border: 'none',
              boxShadow: '0 6px 24px rgba(107, 142, 111, 0.25)',
              color: 'white',
              letterSpacing: '0.3px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 10px 36px rgba(107, 142, 111, 0.35)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 24px rgba(107, 142, 111, 0.25)';
            }}
          >
            <FontAwesomeIcon icon={faPhone} /> 
            Order Now
          </a>
          
          <a 
            href="#preorder" 
            className="fw6 pv3 ph5 br-pill dib no-underline" 
            style={{
              transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              fontSize: 'clamp(0.85rem, 3vw, 1rem)',
              padding: 'clamp(0.6rem, 3vw, 0.75rem) clamp(1rem, 4vw, 1.25rem)',
              background: 'rgba(255, 255, 255, 0.8)',
              color: '#d65a8c',
              border: '2px solid #d65a8c',
              boxShadow: '0 4px 16px rgba(214, 90, 140, 0.15)',
              backdropFilter: 'blur(20px)',
              letterSpacing: '0.3px',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.95)';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 24px rgba(214, 90, 140, 0.25)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.8)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 16px rgba(214, 90, 140, 0.15)';
            }}
          >
            <FontAwesomeIcon icon={faHeart} /> 
            Special Orders
          </a>
        </div>
      </div>
    </div>
    <style>{`
      .hero-grid {
        grid-template-columns: minmax(300px, 1fr) minmax(300px, 1fr) !important;
      }
      @media (max-width: 900px) {
        .hero-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  </section>
);

export default Hero;
