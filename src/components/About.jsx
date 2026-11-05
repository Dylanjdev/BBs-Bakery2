// About.jsx - BB's Bakery & Cafe
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faClock, faHeart, faLocationDot, faMugHot, faUtensils } from '@fortawesome/free-solid-svg-icons';

const values = [
  {
    icon: faClock,
    title: 'Fresh Daily',
    text: 'We bake in small batches so the case feels exciting every time you stop in.',
  },
  {
    icon: faHeart,
    title: 'Made With Care',
    text: 'From breakfast sandwiches to sweet treats, every item is made to feel personal.',
  },
  {
    icon: faLocationDot,
    title: 'Rooted Locally',
    text: 'Proudly serving Pennington Gap, Lee County, and nearby Southwest Virginia communities.',
  },
];

const specialties = [
  { icon: faMugHot, label: 'Coffee & cafe drinks' },
  { icon: faUtensils, label: 'Breakfast and lunch' },
  { icon: faCakeCandles, label: 'Custom cakes and sweets' },
];

const gallery = [
  {
    src: '/assets/images/berry-danishes.jpg',
    alt: 'Fresh berry danishes with icing in the bakery case',
    label: 'Fresh berry danishes',
  },
  {
    src: '/assets/images/sea-salt-chocolate-chip-cookies.jpg',
    alt: 'Fresh chocolate chip cookies finished with flaky sea salt',
    label: 'Sea salt cookies',
  },
  {
    src: '/assets/images/fresh-cinnamon-rolls.jpg',
    alt: 'A pan of freshly baked cinnamon rolls',
    label: 'Cinnamon rolls',
  },
  {
    src: '/assets/images/savory-quiche.jpg',
    alt: 'Slices of savory quiche in a flaky pastry crust',
    label: 'Savory quiche',
  },
];

const bakeryGallery = [
  {
    src: '/assets/images/raspberry-scones.jpg',
    alt: 'Glazed raspberry scones arranged in a bakery tray',
    label: 'Raspberry scones',
  },
  {
    src: '/assets/images/carrot-cake-cupcakes.jpg',
    alt: 'Carrot cake cupcakes with cream cheese frosting and piped carrots',
    label: 'Carrot cake cupcakes',
  },
  {
    src: '/assets/images/pumpkin-cheesecake-slices.jpg',
    alt: 'Pumpkin cheesecake sliced and topped with whipped cream',
    label: 'Pumpkin cheesecake',
  },
  {
    src: '/assets/images/chocolate-candy-cake.jpg',
    alt: 'Chocolate celebration cake covered with chocolate candy pieces',
    label: 'Chocolate candy cake',
  },
  {
    src: '/assets/images/oatmeal-cream-pie-cake.jpg',
    alt: 'Custom cake decorated with oatmeal cream pies and piped frosting',
    label: 'Oatmeal cream pie cake',
  },
  {
    src: '/assets/images/strawberry-chocolate-cake.jpg',
    alt: 'Chocolate cake topped with fresh sliced strawberries',
    label: 'Strawberry chocolate cake',
  },
];

const About = () => (
  <section
    id="about"
    className="about-page"
    style={{
      width: '100%',
      maxWidth: '1180px',
      margin: '0 auto',
      padding: 'clamp(2rem, 7vw, 4rem) clamp(1rem, 4vw, 2rem)',
    }}
    aria-labelledby="about-heading"
  >
    <div
      className="about-hero"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.95fr) minmax(300px, 1.05fr)',
        gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
        marginBottom: 'clamp(2.5rem, 7vw, 5rem)',
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
          Our Story
        </p>

        <h1
          id="about-heading"
          style={{
            margin: '0 0 1.1rem',
            color: '#1a1a1a',
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.4rem, 7vw, 4.7rem)',
            lineHeight: 1,
            letterSpacing: '0',
          }}
        >
          A bakery and cafe built around better mornings.
        </h1>

        <p
          style={{
            margin: '0 0 1rem',
            color: '#5f5f5f',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(1rem, 2.6vw, 1.14rem)',
            lineHeight: 1.78,
            fontWeight: 600,
          }}
        >
          BB's Bakery & Cafe is a Pennington Gap spot for fresh pastries, coffee, breakfast, lunch, and custom sweets. The goal is simple: make everyday stops feel a little warmer and special occasions feel easy to celebrate.
        </p>

        <p
          style={{
            margin: '0 0 1.8rem',
            color: '#6d6d6d',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '1rem',
            lineHeight: 1.75,
          }}
        >
          Some days that means a quick coffee and breakfast sandwich. Other days it is brownies, cupcakes, viral dot cakes, or a custom cake for someone you love. However you come in, we want you to leave with something fresh and worth sharing.
        </p>

        <div
          className="about-specialties"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '0.8rem',
          }}
        >
          {specialties.map((item) => (
            <div
              key={item.label}
              style={{
                display: 'grid',
                gap: '0.45rem',
                alignContent: 'start',
                minHeight: '118px',
                padding: '1rem',
                borderRadius: '14px',
                background: '#fff',
                border: '1px solid rgba(214, 90, 140, 0.18)',
                boxShadow: '0 10px 24px rgba(214, 90, 140, 0.08)',
              }}
            >
              <FontAwesomeIcon icon={item.icon} style={{ color: '#d65a8c', fontSize: '1.25rem' }} />
              <span
                style={{
                  color: '#2a2a2a',
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  lineHeight: 1.35,
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="about-gallery"
        aria-label="Bakery photos"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gridTemplateRows: '180px 180px 160px',
          gap: '0.85rem',
        }}
      >
        {gallery.map((item, index) => (
          <figure
            key={item.src}
            style={{
              margin: 0,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '18px',
              background: '#f8f1f5',
              boxShadow: '0 14px 34px rgba(42, 42, 42, 0.12)',
              gridColumn: index === 0 ? '1 / 3' : undefined,
              gridRow: index === 0 ? 'span 1' : index === 1 ? 'span 2' : undefined,
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              width="900"
              height="1200"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <figcaption
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: '2rem 0.85rem 0.7rem',
                color: '#fff',
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.58) 100%)',
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: 800,
                fontSize: '0.9rem',
              }}
            >
              {item.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>

    <div
      className="about-values"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '1rem',
        marginBottom: 'clamp(2rem, 6vw, 4rem)',
      }}
    >
      {values.map((value) => (
        <article
          key={value.title}
          style={{
            padding: 'clamp(1.25rem, 3vw, 1.65rem)',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ffffff 0%, #fff7fb 100%)',
            border: '1px solid rgba(214, 90, 140, 0.2)',
            boxShadow: '0 10px 28px rgba(214, 90, 140, 0.08)',
          }}
        >
          <FontAwesomeIcon icon={value.icon} style={{ color: '#6b8e6f', fontSize: '1.35rem', marginBottom: '0.9rem' }} />
          <h3
            style={{
              margin: '0 0 0.45rem',
              color: '#1a1a1a',
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.35rem',
            }}
          >
            {value.title}
          </h3>
          <p
            style={{
              margin: 0,
              color: '#6d6d6d',
              fontFamily: 'Quicksand, sans-serif',
              fontSize: '0.98rem',
              lineHeight: 1.65,
            }}
          >
            {value.text}
          </p>
        </article>
      ))}
    </div>

    <section className="bakery-gallery-section" aria-labelledby="bakery-gallery-heading">
      <div className="bakery-gallery-heading">
        <p>From Our Bakery</p>
        <h2 id="bakery-gallery-heading">A little look at what we make.</h2>
        <span>
          The bakery case changes, but you can always expect something fresh, colorful, and made to share.
        </span>
      </div>

      <div className="bakery-gallery-grid">
        {bakeryGallery.map((item) => (
          <figure key={item.src}>
            <img
              src={item.src}
              alt={item.alt}
              width="900"
              height="1200"
              loading="lazy"
              decoding="async"
            />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>

    <div
      className="about-community"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        gap: '1.25rem',
        alignItems: 'center',
        padding: 'clamp(1.4rem, 4vw, 2rem)',
        borderRadius: '18px',
        background: 'linear-gradient(135deg, #fce7f0 0%, #e8f0e8 100%)',
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
          Come see what is fresh today.
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
          Visit us at 103 Main St in Pennington Gap, or check the menu page for online ordering availability.
        </p>
      </div>

      <a
        href="/menu"
        className="about-menu-link no-underline"
        onClick={(event) => {
          if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
            return;
          }
          event.preventDefault();
          window.history.pushState({}, '', '/menu');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '48px',
          padding: '0.85rem 1.2rem',
          borderRadius: '999px',
          color: '#fff',
          background: 'linear-gradient(135deg, #d65a8c 0%, #c9a961 100%)',
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 800,
          whiteSpace: 'nowrap',
          boxShadow: '0 10px 26px rgba(214, 90, 140, 0.2)',
        }}
      >
        View Menu
      </a>
    </div>

    <style>{`
      @media (max-width: 920px) {
        .about-hero {
          grid-template-columns: 1fr !important;
        }

        .about-values {
          grid-template-columns: 1fr !important;
        }

        .bakery-gallery-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
      }

      @media (max-width: 640px) {
        .about-specialties {
          grid-template-columns: 1fr !important;
          gap: 0.75rem !important;
        }

        .about-specialties > div {
          min-height: auto !important;
          padding: 0.9rem 1rem !important;
        }

        .about-gallery {
          grid-template-columns: 1fr !important;
          grid-template-rows: none !important;
        }

        .about-gallery figure {
          grid-column: auto !important;
          grid-row: auto !important;
          min-height: 220px;
        }

        .about-community {
          grid-template-columns: 1fr !important;
        }

        .bakery-gallery-grid {
          grid-template-columns: 1fr !important;
        }

        .bakery-gallery-grid figure:nth-child(n) {
          min-height: 300px !important;
          grid-column: auto !important;
        }

        .about-menu-link {
          width: 100%;
        }
      }

      .bakery-gallery-section {
        margin-bottom: clamp(2rem, 6vw, 4rem);
      }

      .bakery-gallery-heading {
        max-width: 720px;
        margin-bottom: 1.5rem;
      }

      .bakery-gallery-heading > p {
        margin: 0 0 0.55rem;
        color: #d65a8c;
        font-family: Quicksand, sans-serif;
        font-size: 0.9rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .bakery-gallery-heading h2 {
        margin: 0 0 0.65rem;
        color: #1a1a1a;
        font-family: 'Playfair Display', serif;
        font-size: clamp(2rem, 5vw, 3rem);
        line-height: 1.08;
      }

      .bakery-gallery-heading > span {
        display: block;
        color: #6d6d6d;
        font-family: Quicksand, sans-serif;
        font-size: 1rem;
        line-height: 1.7;
      }

      .bakery-gallery-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-auto-rows: 260px;
        gap: 1rem;
      }

      .bakery-gallery-grid figure {
        position: relative;
        min-width: 0;
        margin: 0;
        overflow: hidden;
        border-radius: 18px;
        background: #f8f1f5;
        box-shadow: 0 14px 34px rgba(42, 42, 42, 0.11);
      }

      .bakery-gallery-grid figure:nth-child(1),
      .bakery-gallery-grid figure:nth-child(6) {
        grid-column: span 2;
      }

      .bakery-gallery-grid img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.35s ease;
      }

      .bakery-gallery-grid figure:hover img {
        transform: scale(1.025);
      }

      .bakery-gallery-grid figcaption {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 2.5rem 1rem 0.85rem;
        color: #fff;
        background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.66) 100%);
        font-family: Quicksand, sans-serif;
        font-size: 0.94rem;
        font-weight: 800;
      }
    `}</style>
  </section>
);

export default About;
