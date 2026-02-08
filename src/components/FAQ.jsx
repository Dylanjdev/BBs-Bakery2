// FAQ.jsx - BB's Bakery & Cafe

const FAQ = () => (
  <section
    id="faq"
    className="pv5 mw7 center"
    style={{ padding: 'clamp(2.5rem, 10vw, 4rem) clamp(1rem, 3vw, 2rem)' }}
    aria-labelledby="faq-heading"
  >
    <h2
      id="faq-heading"
      className="f2 fw7 tc mb4"
      style={{
        fontFamily: 'Playfair Display, serif',
        background: 'linear-gradient(135deg, #d65a8c 0%, #6b8e6f 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.8px',
        fontSize: 'clamp(2rem, 6vw, 2.5rem)',
        marginBottom: '1.5rem',
      }}
    >
      ❓ Frequently Asked Questions
    </h2>

    <p
      className="fw5 mb4 tc lh-copy"
      style={{
        color: '#6d6d6d',
        maxWidth: '720px',
        margin: '0 auto 2.5rem',
        fontFamily: 'Quicksand, sans-serif',
        fontSize: '1.02rem',
        lineHeight: '1.7',
      }}
    >
      Answers to common questions about BB's Bakery & Cafe.
    </p>

    <div
      className="flex flex-column"
      style={{ gap: '1.25rem' }}
    >
      {/* Hours */}
      <details
        className="br3 pa3"
        style={{
          background: 'linear-gradient(135deg, #fce7f0 0%, rgba(255,255,255,0.95) 100%)',
          boxShadow: '0 6px 18px rgba(214, 90, 140, 0.12)',
          border: '1px solid rgba(214, 90, 140, 0.35)',
          cursor: 'pointer',
        }}
      >
        <summary
          className="fw6 mb2"
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#d65a8c',
            fontSize: '1rem',
            outline: 'none',
          }}
        >
          What are BB's Bakery & Cafe hours?
        </summary>
        <p
          className="mt2"
          style={{ color: '#555', fontFamily: 'Quicksand, sans-serif', fontSize: '0.95rem' }}
        >
          We're open Monday-Friday from 7:00 AM to 2:00 PM and Saturday from 8:00 AM to 2:00 PM. We are closed on Sundays.
        </p>
      </details>

      {/* Location */}
      <details
        className="br3 pa3"
        style={{
          background: 'linear-gradient(135deg, #e8f0e8 0%, rgba(255,255,255,0.95) 100%)',
          boxShadow: '0 6px 18px rgba(107, 142, 111, 0.12)',
          border: '1px solid rgba(107, 142, 111, 0.35)',
          cursor: 'pointer',
        }}
      >
        <summary
          className="fw6 mb2"
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#6b8e6f',
            fontSize: '1rem',
            outline: 'none',
          }}
        >
          Where is BB's Bakery & Cafe located?
        </summary>
        <p
          className="mt2"
          style={{ color: '#555', fontFamily: 'Quicksand, sans-serif', fontSize: '0.95rem' }}
        >
          We are located at 103 Main St, Pennington Gap, Virginia 24277.
        </p>
      </details>

      {/* Phone orders */}
      <details
        className="br3 pa3"
        style={{
          background: 'linear-gradient(135deg, #fceff2 0%, rgba(255,255,255,0.95) 100%)',
          boxShadow: '0 6px 18px rgba(214, 90, 140, 0.12)',
          border: '1px solid rgba(214, 90, 140, 0.35)',
          cursor: 'pointer',
        }}
      >
        <summary
          className="fw6 mb2"
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#d65a8c',
            fontSize: '1rem',
            outline: 'none',
          }}
        >
          Does BB's Bakery & Cafe take phone orders?
        </summary>
        <p
          className="mt2"
          style={{ color: '#555', fontFamily: 'Quicksand, sans-serif', fontSize: '0.95rem' }}
        >
          Yes! Call us at (276) 571-0891 to place your order.
        </p>
      </details>

      {/* What we serve */}
      <details
        className="br3 pa3"
        style={{
          background: 'linear-gradient(135deg, #fef3e8 0%, rgba(255,255,255,0.95) 100%)',
          boxShadow: '0 6px 18px rgba(201, 169, 97, 0.12)',
          border: '1px solid rgba(201, 169, 97, 0.4)',
          cursor: 'pointer',
        }}
      >
        <summary
          className="fw6 mb2"
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#c9a961',
            fontSize: '1rem',
            outline: 'none',
          }}
        >
          What does BB's Bakery & Cafe serve?
        </summary>
        <p
          className="mt2"
          style={{ color: '#555', fontFamily: 'Quicksand, sans-serif', fontSize: '0.95rem' }}
        >
          We serve fresh-baked breads, pastries, muffins, cinnamon rolls, breakfast sandwiches, specialty coffee drinks, and loaded energy drinks. Everything is made fresh daily.
        </p>
      </details>

      {/* Pre-orders */}
      <details
        className="br3 pa3"
        style={{
          background: 'linear-gradient(135deg, #e8f0e8 0%, rgba(255,255,255,0.95) 100%)',
          boxShadow: '0 6px 18px rgba(107, 142, 111, 0.12)',
          border: '1px solid rgba(107, 142, 111, 0.35)',
          cursor: 'pointer',
        }}
      >
        <summary
          className="fw6 mb2"
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#6b8e6f',
            fontSize: '1rem',
            outline: 'none',
          }}
        >
          Can I pre-order items?
        </summary>
        <p
          className="mt2"
          style={{ color: '#555', fontFamily: 'Quicksand, sans-serif', fontSize: '0.95rem' }}
        >
          Yes! We offer pre-ordering for special items and occasions. Check out our pre-order menu or call us to place your order in advance.
        </p>
      </details>

      {/* Payments */}
      <details
        className="br3 pa3"
        style={{
          background: 'linear-gradient(135deg, #fceff2 0%, rgba(255,255,255,0.95) 100%)',
          boxShadow: '0 6px 18px rgba(214, 90, 140, 0.12)',
          border: '1px solid rgba(214, 90, 140, 0.35)',
          cursor: 'pointer',
        }}
      >
        <summary
          className="fw6 mb2"
          style={{
            fontFamily: 'Quicksand, sans-serif',
            color: '#d65a8c',
            fontSize: '1rem',
            outline: 'none',
          }}
        >
          What payment methods do you accept?
        </summary>
        <p
          className="mt2"
          style={{ color: '#555', fontFamily: 'Quicksand, sans-serif', fontSize: '0.95rem' }}
        >
          We accept cash, credit cards, and debit cards.
        </p>
      </details>
    </div>
  </section>
);

export default FAQ;
