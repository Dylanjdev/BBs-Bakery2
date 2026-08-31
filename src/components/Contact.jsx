// Contact.jsx - BB's Bakery & Cafe
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faDirections,
  faEnvelope,
  faLocationDot,
  faMugHot,
  faPaperPlane,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const contactCards = [
  {
    icon: faPhone,
    label: 'Call the bakery',
    text: '(276) 537-0189',
    detail: 'Best for same-day questions, pickup timing, and custom order details.',
    href: 'tel:2765370189',
    color: '#6b8e6f',
  },
  {
    icon: faEnvelope,
    label: 'Email us',
    text: 'bbscafe25@outlook.com',
    detail: 'Great for cake inspiration photos, event details, and longer requests.',
    href: 'mailto:bbscafe25@outlook.com',
    color: '#d65a8c',
  },
  {
    icon: faFacebook,
    label: 'Follow along',
    text: 'Facebook',
    detail: 'Check for fresh case updates, specials, and bakery announcements.',
    href: 'https://www.facebook.com/profile.php?id=61581654642389',
    color: '#1877f2',
    external: true,
  },
];

const quickInfo = [
  {
    icon: faClock,
    title: 'Hours',
    lines: ['Tuesday-Friday: 7:00 AM - 4:00 PM', 'Saturday: 8:00 AM - 4:00 PM', 'Sunday & Monday: Closed'],
  },
  {
    icon: faMugHot,
    title: 'Ordering Notes',
    lines: ['Online ordering starts at 8:00 AM Tue-Fri.', 'Saturday online ordering starts at 10:00 AM.', 'Custom requests are best discussed before 4:00 PM.'],
  },
];

const mapUrl = 'https://www.google.com/maps/search/?api=1&query=103%20Main%20St%2C%20Pennington%20Gap%2C%20VA%2024277';

const Contact = () => (
  <section
    id="contact"
    className="contact-page"
    style={{
      width: '100%',
      maxWidth: '1180px',
      margin: '0 auto',
      padding: 'clamp(2rem, 7vw, 4rem) clamp(1rem, 4vw, 2rem)',
    }}
    aria-labelledby="contact-heading"
    itemScope
    itemType="https://schema.org/Bakery"
  >
    <meta itemProp="name" content="BB's Bakery & Cafe" />
    <meta itemProp="telephone" content="+12765370189" />
    <meta itemProp="email" content="bbscafe25@outlook.com" />

    <div
      className="contact-hero"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.95fr) minmax(320px, 1.05fr)',
        gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
        marginBottom: 'clamp(2.5rem, 7vw, 4rem)',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 0.75rem',
            color: '#d65a8c',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '0.92rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Visit BB's Bakery & Cafe
        </p>

        <h2
          id="contact-heading"
          style={{
            margin: '0 0 1.1rem',
            color: '#1a1a1a',
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.4rem, 7vw, 4.65rem)',
            lineHeight: 1,
            letterSpacing: '0',
          }}
        >
          Fresh coffee, pastries, and friendly answers are right on Main Street.
        </h2>

        <p
          style={{
            margin: '0 0 1.6rem',
            color: '#5f5f5f',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.14rem)',
            lineHeight: 1.78,
            fontWeight: 600,
          }}
        >
          Have a question about the menu, custom cakes, pickup times, or what is in the case today? Call, email, or stop by BB's Bakery & Cafe in Pennington Gap.
        </p>

        <div
          className="contact-actions"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.85rem',
          }}
        >
          <a
            href="tel:2765370189"
            className="no-underline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              minHeight: '50px',
              padding: '0.85rem 1.2rem',
              borderRadius: '999px',
              color: '#fff',
              background: 'linear-gradient(135deg, #d65a8c 0%, #c9a961 100%)',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 900,
              boxShadow: '0 14px 30px rgba(214, 90, 140, 0.22)',
            }}
          >
            <FontAwesomeIcon icon={faPhone} />
            Call Now
          </a>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              minHeight: '50px',
              padding: '0.85rem 1.2rem',
              borderRadius: '999px',
              color: '#2e5e3f',
              background: '#fff',
              border: '1px solid rgba(107, 142, 111, 0.28)',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 900,
              boxShadow: '0 12px 26px rgba(42, 42, 42, 0.07)',
            }}
          >
            <FontAwesomeIcon icon={faDirections} />
            Get Directions
          </a>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        <figure
          style={{
            margin: 0,
            position: 'relative',
            overflow: 'hidden',
            minHeight: '360px',
            borderRadius: '22px',
            background: '#f8f1f5',
            boxShadow: '0 18px 44px rgba(42, 42, 42, 0.12)',
          }}
        >
          <img
            src="/assets/images/CoverPhoto.webp"
            alt="BB's Bakery & Cafe pastries, coffee, and storefront collage"
            loading="eager"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              minHeight: '360px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <figcaption
            style={{
              position: 'absolute',
              left: '1rem',
              right: '1rem',
              bottom: '1rem',
              padding: '1rem',
              borderRadius: '16px',
              background: 'rgba(34, 28, 25, 0.82)',
              color: '#fff',
              fontFamily: 'Quicksand, sans-serif',
              fontSize: '1rem',
              fontWeight: 800,
              lineHeight: 1.45,
            }}
          >
            103 Main St, Pennington Gap, VA 24277
          </figcaption>
        </figure>
      </div>
    </div>

    <div
      className="contact-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '1rem',
        marginBottom: 'clamp(2rem, 6vw, 3.5rem)',
      }}
    >
      {contactCards.map((card) => (
        <a
          key={card.label}
          href={card.href}
          target={card.external ? '_blank' : undefined}
          rel={card.external ? 'noopener noreferrer' : undefined}
          className="no-underline"
          style={{
            display: 'grid',
            gap: '0.8rem',
            alignContent: 'start',
            minHeight: '220px',
            padding: 'clamp(1.2rem, 3vw, 1.5rem)',
            borderRadius: '18px',
            background: '#fff',
            border: `1px solid ${card.color}33`,
            boxShadow: '0 14px 32px rgba(42, 42, 42, 0.08)',
          }}
        >
          <span
            style={{
              width: '46px',
              height: '46px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '14px',
              color: card.color,
              background: `${card.color}16`,
              fontSize: '1.2rem',
            }}
          >
            <FontAwesomeIcon icon={card.icon} />
          </span>
          <span
            style={{
              color: '#1a1a1a',
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.45rem',
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            {card.label}
          </span>
          <span
            style={{
              color: card.color,
              fontFamily: 'Quicksand, sans-serif',
              fontSize: '1rem',
              fontWeight: 900,
              overflowWrap: 'anywhere',
            }}
          >
            {card.text}
          </span>
          <span
            style={{
              color: '#6d6d6d',
              fontFamily: 'Quicksand, sans-serif',
              fontSize: '0.96rem',
              lineHeight: 1.6,
            }}
          >
            {card.detail}
          </span>
        </a>
      ))}
    </div>

    <div
      className="visit-panel"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.92fr) minmax(320px, 1.08fr)',
        gap: 'clamp(1.25rem, 4vw, 2rem)',
        alignItems: 'stretch',
      }}
    >
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        <div
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
          style={{
            padding: 'clamp(1.25rem, 3vw, 1.65rem)',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #fce7f0 0%, #ffffff 100%)',
            border: '1px solid rgba(214, 90, 140, 0.22)',
            boxShadow: '0 14px 32px rgba(214, 90, 140, 0.08)',
          }}
        >
          <FontAwesomeIcon icon={faLocationDot} style={{ color: '#d65a8c', fontSize: '1.35rem', marginBottom: '0.85rem' }} />
          <h3 style={{ margin: '0 0 0.7rem', color: '#1a1a1a', fontFamily: 'Playfair Display, serif', fontSize: '1.55rem' }}>
            Come See Us
          </h3>
          <p style={{ margin: 0, color: '#4f4f4f', fontFamily: 'Quicksand, sans-serif', fontSize: '1rem', lineHeight: 1.65, fontWeight: 700 }}>
            <span itemProp="streetAddress">103 Main St</span>
            <br />
            <span itemProp="addressLocality">Pennington Gap</span>, <span itemProp="addressRegion">VA</span> <span itemProp="postalCode">24277</span>
          </p>
          <p style={{ margin: '0.85rem 0 0', color: '#6d6d6d', fontFamily: 'Quicksand, sans-serif', lineHeight: 1.65 }}>
            Serving Lee County, Southwest Virginia, and nearby communities.
          </p>
        </div>

        {quickInfo.map((item) => (
          <div
            key={item.title}
            style={{
              padding: 'clamp(1.25rem, 3vw, 1.65rem)',
              borderRadius: '18px',
              background: '#fff',
              border: '1px solid rgba(107, 142, 111, 0.2)',
              boxShadow: '0 14px 32px rgba(42, 42, 42, 0.07)',
            }}
          >
            <FontAwesomeIcon icon={item.icon} style={{ color: '#6b8e6f', fontSize: '1.25rem', marginBottom: '0.75rem' }} />
            <h3 style={{ margin: '0 0 0.7rem', color: '#1a1a1a', fontFamily: 'Playfair Display, serif', fontSize: '1.4rem' }}>
              {item.title}
            </h3>
            <div style={{ display: 'grid', gap: '0.4rem' }}>
              {item.lines.map((line) => (
                <p key={line} style={{ margin: 0, color: '#6d6d6d', fontFamily: 'Quicksand, sans-serif', lineHeight: 1.55 }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          overflow: 'hidden',
          borderRadius: '22px',
          background: '#fff',
          border: '1px solid rgba(214, 90, 140, 0.22)',
          boxShadow: '0 18px 44px rgba(42, 42, 42, 0.1)',
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.9362687766876!2d-83.02847!3d36.75833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885a7e8c0e0e0e0e%3A0x0!2s103%20Main%20St%2C%20Pennington%20Gap%2C%20VA%2024277!5e0!3m2!1sen!2sus!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '520px', display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="BB's Bakery & Cafe location map - 103 Main St, Pennington Gap, VA 24277"
        />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '0.8rem',
            alignItems: 'center',
            padding: '1rem',
            borderTop: '1px solid rgba(42, 42, 42, 0.08)',
          }}
        >
          <span style={{ color: '#4f4f4f', fontFamily: 'Quicksand, sans-serif', fontWeight: 800 }}>
            Need directions?
          </span>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              color: '#d65a8c',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 900,
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            Open in Maps
          </a>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 940px) {
        .contact-hero,
        .visit-panel {
          grid-template-columns: 1fr !important;
        }

        .contact-grid {
          grid-template-columns: 1fr !important;
        }
      }

      @media (max-width: 560px) {
        .contact-actions a {
          width: 100%;
        }
      }
    `}</style>
  </section>
);

export default Contact;
