// Reviews.jsx - BB's Bakery & Cafe
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faQuoteLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const reviews = [
  {
    name: 'Bobbi Lena',
    quote: 'So good and made fresh.',
    detail: 'Best coffee. Delicious pastries.',
    accent: '#d65a8c',
    category: 'Fresh pastries',
  },
  {
    name: 'Jamie Deirth',
    quote: 'Coffee was very good and the spinach and feta quiche was 10/10.',
    detail: 'A favorite stop for coffee and savory breakfast.',
    accent: '#6b8e6f',
    category: 'Coffee & quiche',
  },
  {
    name: 'Greg Whitney Seals',
    quote: 'My iced coffee was amazing!! Will definitely be back!!!',
    detail: 'Sweet coffee drinks that keep people coming back.',
    accent: '#c9a961',
    category: 'Iced coffee',
  },
  {
    name: 'Melissa Muse',
    quote: 'Excellent Iced Caramel Macchiato!!!',
    detail: 'A quick cafe favorite for caramel coffee lovers.',
    accent: '#b0436f',
    category: 'Cafe drinks',
  },
];

const stats = [
  { value: 'Fresh', label: 'baked daily' },
  { value: '10/10', label: 'quiche praise' },
  { value: 'Local', label: 'Pennington Gap favorite' },
];

const StarRating = () => (
  <div aria-label="Five star review" style={{ display: 'inline-flex', gap: '0.18rem', color: '#c9a961' }}>
    {[0, 1, 2, 3, 4].map((star) => (
      <FontAwesomeIcon key={star} icon={faStar} />
    ))}
  </div>
);

const Reviews = () => (
  <section
    id="reviews"
    className="reviews-page"
    style={{
      width: '100%',
      maxWidth: '1180px',
      margin: '0 auto',
      padding: 'clamp(2rem, 7vw, 4rem) clamp(1rem, 4vw, 2rem)',
    }}
    aria-labelledby="reviews-heading"
  >
    <div
      className="reviews-hero"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.95fr) minmax(300px, 1.05fr)',
        gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
        marginBottom: 'clamp(2.5rem, 7vw, 4.5rem)',
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
          Customer Love
        </p>
        <h2
          id="reviews-heading"
          style={{
            margin: '0 0 1.1rem',
            color: '#1a1a1a',
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.4rem, 7vw, 4.7rem)',
            lineHeight: 1,
            letterSpacing: '0',
          }}
        >
          The kind of bakery people come back for.
        </h2>
        <p
          style={{
            margin: '0 0 1.7rem',
            color: '#666',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(1rem, 2.6vw, 1.14rem)',
            lineHeight: 1.75,
            fontWeight: 600,
            maxWidth: '680px',
          }}
        >
          From iced coffee to pastries and quiche, customers keep shouting out the little things that make BB's Bakery & Cafe feel special.
        </p>

        <div
          className="review-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '0.8rem',
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                minHeight: '96px',
                padding: '1rem',
                borderRadius: '14px',
                background: '#fff',
                border: '1px solid rgba(214, 90, 140, 0.18)',
                boxShadow: '0 10px 24px rgba(214, 90, 140, 0.08)',
              }}
            >
              <strong
                style={{
                  display: 'block',
                  color: '#d65a8c',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.4rem',
                  lineHeight: 1.1,
                  marginBottom: '0.35rem',
                }}
              >
                {stat.value}
              </strong>
              <span
                style={{
                  color: '#666',
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  lineHeight: 1.35,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <figure
        style={{
          margin: 0,
          position: 'relative',
          minHeight: 'clamp(360px, 44vw, 520px)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 22px 54px rgba(42, 42, 42, 0.16)',
          background: '#f8f1f5',
        }}
      >
        <img
          src="/assets/images/cookies.webp"
          alt="Fresh chocolate cookies at BB's Bakery & Cafe"
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            minHeight: 'inherit',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <figcaption
          style={{
            position: 'absolute',
            left: 'clamp(1rem, 3vw, 1.4rem)',
            right: 'clamp(1rem, 3vw, 1.4rem)',
            bottom: 'clamp(1rem, 3vw, 1.4rem)',
            padding: '1rem',
            borderRadius: '16px',
            color: '#fff',
            background: 'rgba(26, 22, 18, 0.72)',
            backdropFilter: 'blur(14px)',
            fontFamily: 'Quicksand, sans-serif',
            boxShadow: '0 12px 30px rgba(0,0,0,0.24)',
          }}
        >
          <StarRating />
          <span style={{ display: 'block', marginTop: '0.55rem', fontWeight: 800, lineHeight: 1.35 }}>
            Fresh, cozy, and worth a return trip.
          </span>
        </figcaption>
      </figure>
    </div>

    <div
      className="reviews-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '1rem',
        marginBottom: 'clamp(2rem, 6vw, 4rem)',
      }}
    >
      {reviews.map((review) => (
        <article
          key={review.name}
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '260px',
            padding: 'clamp(1.25rem, 3vw, 1.65rem)',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #ffffff 0%, #fff7fb 100%)',
            border: `1px solid ${review.accent}55`,
            boxShadow: '0 12px 30px rgba(42, 42, 42, 0.08)',
          }}
        >
          <FontAwesomeIcon
            icon={faQuoteLeft}
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '1rem',
              top: '0.85rem',
              color: `${review.accent}22`,
              fontSize: '4.2rem',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <StarRating />
                <p
                  style={{
                    margin: '0.55rem 0 0',
                    color: review.accent,
                    fontFamily: 'Quicksand, sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {review.category}
                </p>
              </div>
            </div>

            <p
              style={{
                margin: '0 0 1.1rem',
                color: '#1f1f1f',
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.35rem, 3.3vw, 1.75rem)',
                lineHeight: 1.28,
                fontWeight: 700,
              }}
            >
              "{review.quote}"
            </p>

            <p
              style={{
                margin: '0 0 1.4rem',
                color: '#6d6d6d',
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '0.98rem',
                lineHeight: 1.62,
              }}
            >
              {review.detail}
            </p>

            <p
              style={{
                margin: 0,
                color: '#2a2a2a',
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: 800,
              }}
            >
              {review.name}
            </p>
          </div>
        </article>
      ))}
    </div>

    <div
      className="reviews-cta"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        gap: '1.25rem',
        alignItems: 'center',
        padding: 'clamp(1.4rem, 4vw, 2rem)',
        borderRadius: '18px',
        background: 'linear-gradient(135deg, #e8f0e8 0%, #fce7f0 100%)',
        border: '1px solid rgba(107, 142, 111, 0.22)',
      }}
    >
      <div>
        <h3
          style={{
            margin: '0 0 0.45rem',
            color: '#1a1a1a',
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.6rem, 4vw, 2.1rem)',
          }}
        >
          See more from the bakery.
        </h3>
        <p
          style={{
            margin: 0,
            color: '#5f5f5f',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '1rem',
            lineHeight: 1.65,
            maxWidth: '720px',
          }}
        >
          Follow along for fresh case updates, customer favorites, and more reviews from the BB's Bakery community.
        </p>
      </div>

      <a
        href="https://www.facebook.com/profile.php?id=61581654642389&sk=reviews"
        target="_blank"
        rel="noopener noreferrer"
        className="reviews-facebook-link no-underline"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.55rem',
          minHeight: '48px',
          padding: '0.85rem 1.2rem',
          borderRadius: '999px',
          color: '#fff',
          background: 'linear-gradient(135deg, #1877f2 0%, #6b8e6f 100%)',
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 800,
          whiteSpace: 'nowrap',
          boxShadow: '0 10px 26px rgba(24, 119, 242, 0.2)',
        }}
      >
        <FontAwesomeIcon icon={faFacebook} />
        More Reviews
        <FontAwesomeIcon icon={faArrowRight} />
      </a>
    </div>

    <style>{`
      @media (max-width: 920px) {
        .reviews-hero,
        .reviews-cta {
          grid-template-columns: 1fr !important;
        }

        .reviews-grid {
          grid-template-columns: 1fr !important;
        }
      }

      @media (max-width: 640px) {
        .review-stats {
          grid-template-columns: 1fr !important;
          gap: 0.75rem !important;
        }

        .review-stats > div {
          min-height: auto !important;
        }

        .reviews-page figure {
          min-height: 300px !important;
        }

        .reviews-facebook-link {
          width: 100%;
        }
      }
    `}</style>
  </section>
);

export default Reviews;
