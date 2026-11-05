// HomeHighlights.jsx - BB's Bakery & Cafe

const featuredItems = [
  {
    title: 'Raspberry Scones',
    description: 'Tender berry scones finished with a sweet glaze.',
    image: '/assets/images/raspberry-scones.jpg',
    alt: 'Fresh glazed raspberry scones in a bakery tray',
  },
  {
    title: 'Sea Salt Chocolate Chip Cookies',
    description: 'Thick chocolate chip cookies with a flaky sea salt finish.',
    image: '/assets/images/sea-salt-chocolate-chip-cookies.jpg',
    alt: 'Freshly baked chocolate chip cookies topped with flaky sea salt',
  },
  {
    title: 'Cinnamon Rolls',
    description: 'Soft, spiraled rolls baked until golden and gooey.',
    image: '/assets/images/fresh-cinnamon-rolls.jpg',
    alt: 'A pan of fresh golden cinnamon rolls',
  },
  {
    title: 'Savory Quiche',
    description: 'Flaky pastry filled with a rich, savory baked custard.',
    image: '/assets/images/savory-quiche.jpg',
    alt: 'Slices of savory quiche with a flaky pastry crust',
  },
  {
    title: 'Pumpkin Cheesecake',
    description: 'Creamy seasonal cheesecake with a spiced pumpkin layer.',
    image: '/assets/images/pumpkin-cheesecake-slices.jpg',
    alt: 'Pumpkin cheesecake sliced and topped with whipped cream',
  },
];

const quickInfo = [
  {
    heading: 'Fresh Daily',
    text: 'Pastries, breakfast items, sweets, and coffee are prepared throughout the week with selection changing by the day.',
  },
  {
    heading: 'Order Ahead',
    text: 'Online ordering is available for eligible breakfast, lunch, and pre-order items whenever ordering is switched on.',
  },
  {
    heading: 'Custom Cakes',
    text: 'Use the custom cake form for celebrations, birthdays, and special requests so the team can follow up with details.',
  },
];

const HomeHighlights = () => (
  <section
    aria-labelledby="home-highlights-heading"
    style={{
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: 'clamp(2rem, 7vw, 4.5rem) clamp(1rem, 4vw, 2rem)',
    }}
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
        gap: 'clamp(1.75rem, 4vw, 3rem)',
        alignItems: 'center',
      }}
      className="home-highlights-layout"
    >
      <div>
        <p
          className="fw7"
          style={{
            margin: '0 0 0.75rem',
            color: '#d65a8c',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '0.95rem',
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
          }}
        >
          Baked in Pennington Gap
        </p>
        <h2
          id="home-highlights-heading"
          style={{
            margin: '0 0 1rem',
            color: '#1a1a1a',
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 6vw, 3.25rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.8px',
          }}
        >
          Stop in for coffee, breakfast, lunch, and fresh bakery favorites.
        </h2>
        <p
          style={{
            margin: '0 0 2rem',
            color: '#6d6d6d',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            lineHeight: 1.75,
            maxWidth: '620px',
          }}
        >
          BB's Bakery & Cafe serves fresh-baked sweets, savory cafe items, custom cakes, and coffee for Lee County and Southwest Virginia.
        </p>

        <div
          style={{
            display: 'grid',
            gap: '1rem',
          }}
        >
          {quickInfo.map((item) => (
            <article
              key={item.heading}
              style={{
                padding: '1rem 0',
                borderTop: '1px solid rgba(214, 90, 140, 0.22)',
              }}
            >
              <h3
                style={{
                  margin: '0 0 0.35rem',
                  color: '#2a2a2a',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.25rem',
                }}
              >
                {item.heading}
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
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div
        aria-label="Fresh bakery item photos"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridAutoRows: 'minmax(110px, 1fr)',
          gap: '0.75rem',
        }}
        className="home-gallery"
      >
        {featuredItems.map((item, index) => (
          <figure
            key={item.title}
            style={{
              gridColumn: index === 0 ? 'span 3' : index === 1 ? 'span 3' : index === 4 ? 'span 2' : 'span 2',
              gridRow: index < 2 ? 'span 2' : 'span 1',
              minHeight: index < 2 ? '280px' : '190px',
              margin: 0,
              borderRadius: '18px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 14px 34px rgba(42, 42, 42, 0.12)',
              background: '#f7f3ee',
            }}
          >
            <img
              src={item.image}
              alt={item.alt}
              width="900"
              height="1200"
              loading={index < 2 ? 'eager' : 'lazy'}
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
                padding: '2.4rem 1rem 0.9rem',
                color: '#fff',
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.62) 100%)',
                fontFamily: 'Quicksand, sans-serif',
              }}
            >
              <span style={{ display: 'block', fontWeight: 800, fontSize: '0.95rem' }}>
                {item.title}
              </span>
              <span style={{ display: 'block', fontSize: '0.82rem', lineHeight: 1.35, opacity: 0.92 }}>
                {item.description}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 950px) {
        .home-highlights-layout {
          grid-template-columns: 1fr !important;
        }
      }

      @media (max-width: 640px) {
        .home-gallery {
          grid-template-columns: 1fr !important;
          grid-auto-rows: auto !important;
          gap: 0.85rem !important;
        }

        .home-gallery figure {
          grid-column: auto !important;
          grid-row: auto !important;
          min-height: 220px !important;
          border-radius: 14px !important;
        }

        .home-gallery figcaption {
          padding: 2rem 0.85rem 0.75rem !important;
        }
      }
    `}</style>
  </section>
);

export default HomeHighlights;
