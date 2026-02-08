// Reviews.jsx - BB's Bakery & Cafe

const Reviews = () => (
  <section
    id="reviews"
    className="pv5 mw7 center"
    style={{ padding: 'clamp(2rem, 8vw, 3rem) 1rem' }}
    aria-labelledby="reviews-heading"
  >
    <h2
      id="reviews-heading"
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
      Customer Reviews
    </h2>

    <p
      className="fw5 mb4 tc lh-copy"
      style={{
        color: '#6d6d6d',
        maxWidth: '700px',
        margin: '0 auto 2.5rem',
        fontFamily: 'Quicksand, sans-serif',
        fontSize: '1.02rem',
        lineHeight: '1.7',
      }}
    >
      See what our customers are saying about BB's Bakery & Cafe.
    </p>

    <div
      className="flex flex-wrap justify-center"
      style={{ gap: 'clamp(1.25rem, 3vw, 1.75rem)' }}
    >
      {/* Bobbi Lena */}
      <article
        className="br3 pa3 tc"
        style={{
          minWidth: '260px',
          maxWidth: '300px',
          background: 'linear-gradient(135deg, #fce7f0 0%, rgba(255,255,255,0.95) 100%)',
          boxShadow: '0 8px 24px rgba(214, 90, 140, 0.12)',
          border: '1px solid rgba(214, 90, 140, 0.35)',
        }}
      >
        <p
          className="fw6 mb2"
          style={{ fontFamily: 'Quicksand, sans-serif', color: '#d65a8c' }}
        >
          Bobbi Lena
        </p>
        <p
          className="f6 mb0"
          style={{ color: '#555', fontFamily: 'Quicksand, sans-serif' }}
        >
          So good and made fresh😋
        </p>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0.75rem 0 0',
            color: '#777',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '0.9rem',
          }}
        >
          <li>Best coffee</li>
          <li>Delicious pastries</li>
        </ul>
      </article>

      {/* Jamie Deirth */}
      <article
        className="br3 pa3 tc"
        style={{
          minWidth: '260px',
          maxWidth: '300px',
          background: 'linear-gradient(135deg, #e8f0e8 0%, rgba(255,255,255,0.95) 100%)',
          boxShadow: '0 8px 24px rgba(107, 142, 111, 0.12)',
          border: '1px solid rgba(107, 142, 111, 0.35)',
        }}
      >
        <p
          className="fw6 mb2"
          style={{ fontFamily: 'Quicksand, sans-serif', color: '#6b8e6f' }}
        >
          Jamie Deirth
        </p>
        <p
          className="f6 mb0"
          style={{ color: '#555', fontFamily: 'Quicksand, sans-serif' }}
        >
          Coffee was very good and the spinach and feta quiche was 10/10.
        </p>
      </article>

      {/* Greg Whitney Seals */}
      <article
        className="br3 pa3 tc"
        style={{
          minWidth: '260px',
          maxWidth: '300px',
          background: 'linear-gradient(135deg, #fef3e8 0%, rgba(255,255,255,0.95) 100%)',
          boxShadow: '0 8px 24px rgba(201, 169, 97, 0.12)',
          border: '1px solid rgba(201, 169, 97, 0.4)',
        }}
      >
        <p
          className="fw6 mb2"
          style={{ fontFamily: 'Quicksand, sans-serif', color: '#c9a961' }}
        >
          Greg Whitney Seals
        </p>
        <p
          className="f6 mb0"
          style={{ color: '#555', fontFamily: 'Quicksand, sans-serif' }}
        >
          My iced coffee was amazing!! Will definitely be back!!!
        </p>
      </article>

      {/* Melissa Muse */}
      <article
        className="br3 pa3 tc"
        style={{
          minWidth: '260px',
          maxWidth: '300px',
          background: 'linear-gradient(135deg, #fceff2 0%, rgba(255,255,255,0.95) 100%)',
          boxShadow: '0 8px 24px rgba(214, 90, 140, 0.12)',
          border: '1px solid rgba(214, 90, 140, 0.35)',
        }}
      >
        <p
          className="fw6 mb2"
          style={{ fontFamily: 'Quicksand, sans-serif', color: '#d65a8c' }}
        >
          Melissa Muse
        </p>
        <p
          className="f6 mb0"
          style={{ color: '#555', fontFamily: 'Quicksand, sans-serif' }}
        >
          Excellent Iced Caramel Macchiato!!!
        </p>
      </article>
    </div>

    <div className="tc mt4">
      <a
        href="https://www.facebook.com/profile.php?id=61581654642389&sk=reviews"
        target="_blank"
        rel="noopener noreferrer"
        className="fw6 pv3 ph5 br-pill dib no-underline"
        style={{
          display: 'inline-block',
          marginTop: '1.5rem',
          background: 'linear-gradient(135deg, #3b5998 0%, #8b9dc3 100%)',
          color: 'white',
          fontFamily: 'Quicksand, sans-serif',
          fontSize: '0.95rem',
          letterSpacing: '0.3px',
          boxShadow: '0 6px 20px rgba(59, 89, 152, 0.35)',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-3px)';
          e.target.style.boxShadow = '0 10px 28px rgba(59, 89, 152, 0.45)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 6px 20px rgba(59, 89, 152, 0.35)';
        }}
      >
        View more reviews on Facebook
      </a>
    </div>
  </section>
);

export default Reviews;
