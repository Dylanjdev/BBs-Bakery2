// Hero.jsx - BB's Bakery & Cafe
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

const handleInternalClick = (event, path) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  ) {
    return;
  }

  event.preventDefault();
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const Hero = () => (
  <section 
    className="hero-shell relative" 
    aria-label="Welcome banner"
    style={{
      position: 'relative',
      isolation: 'isolate',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '1400px',
      minHeight: 'auto',
      margin: 'clamp(0.75rem, 3vw, 1.5rem) auto 0',
      borderRadius: 'clamp(18px, 4vw, 34px)',
      background: 'linear-gradient(135deg, rgba(252, 231, 240, 0.62) 0%, rgba(255, 255, 255, 0.96) 44%, rgba(232, 240, 232, 0.65) 100%)',
      boxShadow: '0 24px 70px rgba(42, 42, 42, 0.16)'
    }}
  >
    <div
      className="hero-content"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.86fr) minmax(320px, 1.14fr)',
        alignItems: 'center',
        gap: 'clamp(1.5rem, 5vw, 4rem)',
        padding: 'clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div
        className="hero-copy"
        style={{
          maxWidth: '760px',
          paddingBottom: 'clamp(0.5rem, 2vw, 1rem)'
        }}
      >
        <div
          className="hero-kicker"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            marginBottom: '1rem',
            padding: '0.52rem 0.82rem',
            borderRadius: '999px',
            color: '#8f2d58',
            background: '#fff',
            border: '1px solid rgba(214, 90, 140, 0.18)',
            boxShadow: '0 8px 20px rgba(214, 90, 140, 0.1)',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            lineHeight: 1.2
          }}
        >
          <FontAwesomeIcon icon={faClock} />
          BB&apos;s Bakery & Cafe in Pennington Gap
        </div>

        <h1 
          className="hero-title f1 f-headline-l fw7 mb3 mt0 lh-title" 
          style={{
            fontFamily: 'Playfair Display, serif',
            color: '#1a1a1a',
            letterSpacing: '0',
            fontSize: 'clamp(2.9rem, 7vw, 6rem)',
            lineHeight: 1,
            textAlign: 'left',
            margin: '0 0 1.15rem 0',
            overflowWrap: 'break-word',
            maxWidth: '940px',
          }}
        >
          Bakery mornings worth leaving early for.
        </h1>
        
        <p 
          className="hero-subtitle fw6 mb3" 
          style={{
            color: '#5f5f5f',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(1.05rem, 2.7vw, 1.35rem)',
            letterSpacing: '0',
            lineHeight: '1.65',
            textAlign: 'left',
            margin: '0 0 1.4rem 0',
            maxWidth: '620px',
          }}
        >
          BB&apos;s Bakery & Cafe serves warm pastries, coffee, breakfast, lunch, viral dot cakes, and custom sweets made right here in Lee County.
        </p>
        
        <p 
          className="hero-location fw6 flex items-center"
          style={{
            color: '#747474',
            fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
            gap: '0.55rem',
            textAlign: 'left',
            alignItems: 'center',
            margin: '0 0 2rem 0',
            fontFamily: 'Quicksand, sans-serif'
          }}
        >
          <FontAwesomeIcon icon={faLocationDot} style={{color: '#d65a8c', fontSize: '1rem', flexShrink: 0}} /> 
          Pennington Gap, Virginia. Serving Lee County and Southwest Virginia.
        </p>
        
        <div 
          className="hero-actions flex flex-wrap items-center" 
          style={{gap: '0.85rem', justifyContent: 'flex-start'}}
        >
          <a 
            href="/menu" 
            className="hero-action-primary fw7 pv3 ph5 br-pill dib no-underline" 
            onClick={(event) => handleInternalClick(event, '/menu')}
            style={{
              transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
              padding: '0.9rem 1.35rem',
              background: 'linear-gradient(135deg, #d65a8c 0%, #c9a961 100%)',
              color: '#fff',
              border: 'none',
              boxShadow: '0 10px 30px rgba(214, 90, 140, 0.24)',
              letterSpacing: '0',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 14px 38px rgba(214, 90, 140, 0.32)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(214, 90, 140, 0.24)';
            }}
          >
            View Menu
            <FontAwesomeIcon icon={faArrowRight} />
          </a>

          <a
            href="/custom-cakes"
            className="hero-action-secondary fw7 pv3 ph5 br-pill dib no-underline"
            onClick={(event) => handleInternalClick(event, '/custom-cakes')}
            style={{
              transition: 'all 0.35s ease',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
              padding: '0.9rem 1.25rem',
              background: '#fff',
              color: '#8f2d58',
              border: '1px solid rgba(214, 90, 140, 0.24)',
              boxShadow: '0 8px 22px rgba(214, 90, 140, 0.1)',
              whiteSpace: 'nowrap'
            }}
          >
            Custom Cakes
          </a>
          
          <a 
            href="tel:2765370189" 
            className="hero-phone fw7 pv3 ph5 br-pill dib no-underline white" 
            aria-label="Call BB's Bakery" 
            style={{
              transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
              padding: '0.9rem 1.25rem',
              background: 'linear-gradient(135deg, #6b8e6f 0%, #a7d5ab 100%)',
              border: 'none',
              boxShadow: '0 10px 30px rgba(107, 142, 111, 0.22)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
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
            Call Now
          </a>
        </div>
      </div>

      <div
        className="hero-image-panel"
        style={{
          position: 'relative',
          minHeight: 'clamp(360px, 44vw, 560px)',
          borderRadius: 'clamp(18px, 4vw, 30px)',
          overflow: 'hidden',
          boxShadow: '0 22px 54px rgba(42, 42, 42, 0.18)',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          background: '#f8f1f5'
        }}
      >
        <img
          src="/assets/images/CoverPhoto.webp"
          alt="Fresh baked pastries and breads at BB's Bakery & Cafe in Pennington Gap, Virginia"
          width="1200"
          height="600"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          style={{
            width: '100%',
            height: '100%',
            minHeight: 'inherit',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            filter: 'saturate(1.05) contrast(1.04)'
          }}
        />
        <div
          className="hero-image-badge"
          style={{
            position: 'absolute',
            left: 'clamp(1rem, 3vw, 1.5rem)',
            bottom: 'clamp(1rem, 3vw, 1.5rem)',
            maxWidth: 'min(300px, calc(100% - 2rem))',
            padding: '0.9rem 1rem',
            borderRadius: '16px',
            color: '#fff',
            background: 'rgba(26, 22, 18, 0.72)',
            backdropFilter: 'blur(14px)',
            fontFamily: 'Quicksand, sans-serif',
            boxShadow: '0 12px 30px rgba(0,0,0,0.24)'
          }}
        >
          <strong style={{ display: 'block', fontSize: '0.98rem', marginBottom: '0.18rem' }}>
            Fresh-baked every morning
          </strong>
          <span style={{ display: 'block', fontSize: '0.86rem', lineHeight: 1.45, opacity: 0.9 }}>
            Pastries, coffee, breakfast, lunch, and sweets made for Pennington Gap.
          </span>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 980px) {
        .hero-content {
          grid-template-columns: 1fr !important;
          align-items: center !important;
        }
      }

      @media (max-width: 520px) {
        .hero-shell {
          min-height: auto !important;
        }

        .hero-content {
          padding: 1.35rem !important;
          gap: 1.2rem !important;
        }

        .hero-title {
          font-size: clamp(2.65rem, 12vw, 3.35rem) !important;
          line-height: 1 !important;
        }

        .hero-subtitle {
          font-size: 1rem !important;
          line-height: 1.55 !important;
        }

        .hero-actions {
          align-items: stretch !important;
        }

        .hero-actions a {
          justify-content: center !important;
          flex: 1 1 100% !important;
        }

        .hero-image-panel {
          min-height: 280px !important;
          border-radius: 18px !important;
        }
      }
    `}</style>
  </section>
);

export default Hero;
