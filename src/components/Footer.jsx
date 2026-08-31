// Footer.jsx - BB's Bakery & Cafe
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const footerColumns = [
  {
    title: 'Visit',
    content: (
      <>
        <a
          href="https://www.google.com/maps/search/?api=1&query=103%20Main%20St%2C%20Pennington%20Gap%2C%20VA%2024277"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
          style={{ color: '#4f4f4f', fontWeight: 700 }}
        >
          <FontAwesomeIcon icon={faLocationDot} style={{ color: '#d65a8c', marginRight: '0.45rem' }} />
          103 Main St
        </a>
        <span>Pennington Gap, VA 24277</span>
        <span>Serving Lee County and Southwest Virginia.</span>
      </>
    ),
  },
  {
    title: 'Hours',
    content: (
      <>
        <span>Tuesday - Friday: 7:00 AM - 4:00 PM</span>
        <span>Saturday: 8:00 AM - 4:00 PM</span>
        <span>Sunday & Monday: Closed</span>
      </>
    ),
  },
  {
    title: 'Contact',
    content: (
      <>
        <a href="tel:2765370189" className="no-underline" style={{ color: '#4f4f4f', fontWeight: 700 }}>
          <FontAwesomeIcon icon={faPhone} style={{ color: '#6b8e6f', marginRight: '0.45rem' }} />
          (276) 537-0189
        </a>
        <a href="mailto:bbscafe25@outlook.com" className="no-underline" style={{ color: '#4f4f4f', fontWeight: 700, overflowWrap: 'anywhere' }}>
          <FontAwesomeIcon icon={faEnvelope} style={{ color: '#d65a8c', marginRight: '0.45rem' }} />
          bbscafe25@outlook.com
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61581654642389"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
          style={{ color: '#4f4f4f', fontWeight: 700 }}
        >
          <FontAwesomeIcon icon={faFacebook} style={{ color: '#1877f2', marginRight: '0.45rem' }} />
          Facebook
        </a>
      </>
    ),
  },
  {
    title: 'Quick Links',
    content: (
      <>
        <a href="/menu" className="no-underline" style={{ color: '#4f4f4f', fontWeight: 700 }}>Menu</a>
        <a href="/catering" className="no-underline" style={{ color: '#4f4f4f', fontWeight: 700 }}>Catering</a>
        <a href="/custom-cakes" className="no-underline" style={{ color: '#4f4f4f', fontWeight: 700 }}>Custom Cakes</a>
        <a href="/contact" className="no-underline" style={{ color: '#4f4f4f', fontWeight: 700 }}>Contact</a>
      </>
    ),
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="pv5" 
      style={{
        background: 'linear-gradient(135deg, #fce7f0 0%, #e8f0e8 100%)',
        borderTop: '3px solid #d65a8c',
        marginTop: '4rem',
        padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1180px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 2.5rem)',
            textAlign: 'left',
            marginBottom: '2rem',
          }}
        >
          <div>
            <img
              src="/assets/images/logo.webp"
              alt="BB's Bakery logo"
              width="68"
              height="68"
              style={{
                display: 'block',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid rgba(214, 90, 140, 0.35)',
                boxShadow: '0 8px 22px rgba(214, 90, 140, 0.16)',
                marginBottom: '1rem',
              }}
              loading="lazy"
              decoding="async"
            />
            <h2
              style={{
                margin: '0 0 0.65rem',
                color: '#1a1a1a',
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.45rem',
                lineHeight: 1.15,
              }}
            >
              BB's Bakery & Cafe
            </h2>
            <p
              style={{
                margin: 0,
                color: '#6d6d6d',
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.65,
                maxWidth: '280px',
              }}
            >
              Fresh-baked pastries, coffee, breakfast, lunch, and custom sweets in Pennington Gap.
            </p>
          </div>

          {footerColumns.map((column) => (
            <section key={column.title} aria-label={column.title}>
              <h3
                style={{
                  margin: '0 0 0.85rem',
                  color: '#2a2a2a',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.08rem',
                }}
              >
                {column.title}
              </h3>
              <div
                style={{
                  display: 'grid',
                  gap: '0.55rem',
                  color: '#4f4f4f',
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '0.94rem',
                  lineHeight: 1.55,
                }}
              >
                {column.content}
              </div>
            </section>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(214, 90, 140, 0.28)',
            paddingTop: '1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '0.85rem',
            alignItems: 'center',
          }}
        >
          <p 
            className="mb0 f4 fw7" 
            style={{
              background: 'linear-gradient(135deg, #d65a8c 0%, #6b8e6f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Playfair Display, serif',
              margin: 0,
              letterSpacing: '0.3px',
              fontSize: '1.05rem'
            }}
          >
            © {currentYear} BB's Bakery & Cafe
          </p>
      
          <p 
            className="f6 fw6" 
            style={{
              color: '#6d6d6d',
              fontFamily: 'Quicksand, sans-serif',
              margin: 0,
              fontSize: '0.95rem',
              letterSpacing: '0.3px'
            }}
          >
            Made with care by{' '}
            <a 
              href="https://smithdigitals.com" 
              aria-label="Visit Smith Digitals website"
              target="_blank" 
              rel="noopener noreferrer" 
              className="link no-underline" 
              style={{
                color: '#d65a8c',
                fontWeight: '700',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.opacity = '0.8';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.target.style.opacity = '1';
                e.target.style.textDecoration = 'none';
              }}
            >
              Smith Digitals
            </a>
          </p>
        </div>
      </div>
      <style>{`
        footer a {
          transition: color 0.2s ease, opacity 0.2s ease;
        }

        footer a:hover {
          color: #d65a8c !important;
        }

        @media (max-width: 640px) {
          footer {
            text-align: left;
          }

          footer p {
            max-width: 100%;
          }
        }

        @media (max-width: 520px) {
          footer section {
            border-top: 1px solid rgba(214, 90, 140, 0.18);
            padding-top: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
