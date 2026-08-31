// FAQ.jsx - BB's Bakery & Cafe
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCakeCandles, faClock, faCreditCard, faLocationDot, faPhone, faQuestion, faShoppingBag, faUtensils } from '@fortawesome/free-solid-svg-icons';

const faqGroups = [
  {
    title: 'Visit & Hours',
    icon: faClock,
    accent: '#d65a8c',
    questions: [
      {
        question: "What are BB's Bakery & Cafe hours?",
        answer: "We're open Tuesday through Friday from 7:00 AM to 4:00 PM and Saturday from 8:00 AM to 4:00 PM. We are closed on Sundays and Mondays.",
      },
      {
        question: "Where is BB's Bakery & Cafe located?",
        answer: 'We are located at 103 Main St, Pennington Gap, Virginia 24277.',
      },
    ],
  },
  {
    title: 'Ordering',
    icon: faShoppingBag,
    accent: '#6b8e6f',
    questions: [
      {
        question: "Does BB's Bakery & Cafe take phone orders?",
        answer: 'Yes. Call us at (276) 537-0189 to place your order or ask what is available today.',
      },
      {
        question: 'Can I pre-order items?',
        answer: 'Yes. We offer pre-ordering for special items and occasions. Check the menu page for current pre-order items or call us to place your order in advance.',
      },
      {
        question: 'When do I pick up an online order?',
        answer: 'Pickup windows follow our ordering hours. Tuesday through Friday pickup is 8:00 AM to 4:00 PM, and Saturday pickup is 10:00 AM to 4:00 PM.',
      },
    ],
  },
  {
    title: 'Menu & Cakes',
    icon: faCakeCandles,
    accent: '#c9a961',
    questions: [
      {
        question: "What does BB's Bakery & Cafe serve?",
        answer: 'We serve fresh-baked breads, pastries, muffins, cinnamon rolls, breakfast sandwiches, lunch items, specialty coffee drinks, loaded energy drinks, cupcakes, brownies, and more.',
      },
      {
        question: 'Do you make custom cakes?',
        answer: 'Yes. Submit the custom cake form with your date, flavor ideas, servings, and inspiration photos. Custom cakes need at least 14 days of notice.',
      },
      {
        question: 'Do bakery items change?',
        answer: 'Yes. Selection can vary by day because items are made fresh and baked in small batches.',
      },
    ],
  },
  {
    title: 'Payments',
    icon: faCreditCard,
    accent: '#b0436f',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, credit cards, and debit cards.',
      },
    ],
  },
];

const quickLinks = [
  {
    label: 'Call the cafe',
    href: 'tel:2765370189',
    icon: faPhone,
  },
  {
    label: 'View menu',
    href: '/menu',
    icon: faUtensils,
    internal: true,
  },
  {
    label: 'Custom cakes',
    href: '/custom-cakes',
    icon: faCakeCandles,
    internal: true,
  },
  {
    label: 'Get directions',
    href: 'https://www.google.com/maps/search/?api=1&query=103%20Main%20St%2C%20Pennington%20Gap%2C%20VA%2024277',
    icon: faLocationDot,
    external: true,
  },
];

const handleInternalLink = (event, path) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
    return;
  }

  event.preventDefault();
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const FAQ = () => (
  <section
    id="faq"
    className="faq-page"
    style={{
      width: '100%',
      maxWidth: '1180px',
      margin: '0 auto',
      padding: 'clamp(2rem, 7vw, 4rem) clamp(1rem, 4vw, 2rem)',
    }}
    aria-labelledby="faq-heading"
  >
    <div
      className="faq-hero"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 0.45fr)',
        gap: 'clamp(1.5rem, 4vw, 3rem)',
        alignItems: 'stretch',
        marginBottom: 'clamp(2rem, 6vw, 4rem)',
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
          Need To Know
        </p>
        <h2
          id="faq-heading"
          style={{
            margin: '0 0 1.1rem',
            color: '#1a1a1a',
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.4rem, 7vw, 4.7rem)',
            lineHeight: 1,
            letterSpacing: '0',
          }}
        >
          Frequently asked questions.
        </h2>
        <p
          style={{
            margin: 0,
            color: '#666',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(1rem, 2.6vw, 1.14rem)',
            lineHeight: 1.75,
            fontWeight: 600,
            maxWidth: '720px',
          }}
        >
          Quick answers about visiting, ordering, custom cakes, payments, and what to expect when you stop by BB's Bakery & Cafe.
        </p>
      </div>

      <aside
        aria-label="Quick contact links"
        style={{
          padding: 'clamp(1.15rem, 3vw, 1.5rem)',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #fce7f0 0%, #e8f0e8 100%)',
          border: '1px solid rgba(214, 90, 140, 0.2)',
          boxShadow: '0 12px 30px rgba(42, 42, 42, 0.08)',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            color: '#d65a8c',
            boxShadow: '0 8px 18px rgba(214, 90, 140, 0.12)',
            marginBottom: '0.85rem',
          }}
        >
          <FontAwesomeIcon icon={faQuestion} />
        </div>

        <h3
          style={{
            margin: '0 0 0.4rem',
            color: '#1a1a1a',
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.45rem',
          }}
        >
          Still wondering?
        </h3>
        <p
          style={{
            margin: '0 0 1rem',
            color: '#5f5f5f',
            fontFamily: 'Quicksand, sans-serif',
            lineHeight: 1.55,
            fontWeight: 600,
          }}
        >
          Call us and we can help with today&apos;s selection, ordering, or custom cake details.
        </p>

        <div style={{ display: 'grid', gap: '0.6rem' }}>
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={link.internal ? (event) => handleInternalLink(event, link.href) : undefined}
              className="faq-quick-link no-underline"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.8rem',
                minHeight: '44px',
                padding: '0.72rem 0.85rem',
                borderRadius: '12px',
                background: '#fff',
                color: '#2a2a2a',
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: 800,
                boxShadow: '0 6px 16px rgba(42, 42, 42, 0.06)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}>
                <FontAwesomeIcon icon={link.icon} style={{ color: '#d65a8c' }} />
                {link.label}
              </span>
              <FontAwesomeIcon icon={faArrowRight} style={{ color: '#6b8e6f', fontSize: '0.85rem' }} />
            </a>
          ))}
        </div>
      </aside>
    </div>

    <div
      className="faq-groups"
      style={{
        display: 'grid',
        gap: '1rem',
      }}
    >
      {faqGroups.map((group) => (
        <section
          key={group.title}
          className="faq-group"
          aria-labelledby={`faq-group-${group.title.replace(/\s+/g, '-').toLowerCase()}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 0.35fr) minmax(0, 1fr)',
            gap: '1rem',
            padding: 'clamp(1rem, 3vw, 1.35rem)',
            borderRadius: '18px',
            background: '#fff',
            border: `1px solid ${group.accent}33`,
            boxShadow: '0 12px 30px rgba(42, 42, 42, 0.06)',
          }}
        >
          <div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                background: group.accent,
                marginBottom: '0.85rem',
              }}
            >
              <FontAwesomeIcon icon={group.icon} />
            </div>
            <h3
              id={`faq-group-${group.title.replace(/\s+/g, '-').toLowerCase()}`}
              style={{
                margin: 0,
                color: '#1a1a1a',
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.35rem, 3vw, 1.7rem)',
              }}
            >
              {group.title}
            </h3>
          </div>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {group.questions.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                style={{
                  borderRadius: '14px',
                  border: `1px solid ${group.accent}26`,
                  background: `linear-gradient(135deg, ${group.accent}10 0%, rgba(255,255,255,0.95) 100%)`,
                  overflow: 'hidden',
                }}
              >
                <summary
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    cursor: 'pointer',
                    padding: '1rem',
                    color: '#2a2a2a',
                    fontFamily: 'Quicksand, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 800,
                    listStyle: 'none',
                  }}
                >
                  {item.question}
                  <span
                    aria-hidden="true"
                    style={{
                      color: group.accent,
                      fontSize: '1.25rem',
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    margin: 0,
                    padding: '0 1rem 1rem',
                    color: '#5f5f5f',
                    fontFamily: 'Quicksand, sans-serif',
                    fontSize: '0.98rem',
                    lineHeight: 1.68,
                  }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>

    <style>{`
      .faq-page details summary::-webkit-details-marker {
        display: none;
      }

      .faq-quick-link {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .faq-quick-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 22px rgba(42, 42, 42, 0.1) !important;
      }

      @media (max-width: 920px) {
        .faq-hero,
        .faq-group {
          grid-template-columns: 1fr !important;
        }
      }

      @media (max-width: 640px) {
        .faq-page summary {
          align-items: flex-start !important;
        }
      }
    `}</style>
  </section>
);

export default FAQ;
