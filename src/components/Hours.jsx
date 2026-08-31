// Hours.jsx - BB's Bakery & Cafe
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faMugHot, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import '../hours-fix.css';

const weeklyHours = [
  { day: 'Sunday', hours: 'Closed', isClosed: true },
  { day: 'Monday', hours: 'Closed', isClosed: true },
  { day: 'Tuesday', hours: '7:00 AM - 4:00 PM' },
  { day: 'Wednesday', hours: '7:00 AM - 4:00 PM' },
  { day: 'Thursday', hours: '7:00 AM - 4:00 PM' },
  { day: 'Friday', hours: '7:00 AM - 4:00 PM' },
  { day: 'Saturday', hours: '8:00 AM - 4:00 PM' },
];

function getOpenStatus() {
  const now = new Date();
  const day = now.getDay();
  const currentTime = now.getHours() + now.getMinutes() / 60;
  const isTuesdayToFriday = day >= 2 && day <= 5;
  const isSaturday = day === 6;
  const isOpen =
    (isTuesdayToFriday && currentTime >= 7 && currentTime < 16) ||
    (isSaturday && currentTime >= 8 && currentTime < 16);

  let statusText = '';
  let detailText = '';

  if (isOpen) {
    statusText = 'Open Now';
    detailText = 'Stop in before 4:00 PM for fresh bakery and cafe favorites.';
  } else if (day === 0 || day === 1 || (day === 6 && currentTime >= 16)) {
    statusText = 'Closed Today';
    detailText = 'We open again Tuesday at 7:00 AM.';
  } else if (day === 6 && currentTime < 8) {
    statusText = 'Closed Now';
    detailText = 'We open today at 8:00 AM.';
  } else if (day >= 2 && day <= 5 && currentTime < 7) {
    statusText = 'Closed Now';
    detailText = 'We open today at 7:00 AM.';
  } else if (day >= 2 && day <= 4 && currentTime >= 16) {
    statusText = 'Closed Now';
    detailText = 'We open tomorrow at 7:00 AM.';
  } else if (day === 5 && currentTime >= 16) {
    statusText = 'Closed Now';
    detailText = 'We open Saturday at 8:00 AM.';
  } else {
    statusText = 'Closed Now';
    detailText = 'Check the weekly schedule below for our next open day.';
  }

  return { isOpen, statusText, detailText, currentDay: day };
}

function Hours() {
  const [status, setStatus] = useState(getOpenStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getOpenStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hours"
      className="hours-section"
      style={{
        width: '100%',
        maxWidth: '1180px',
        margin: '0 auto',
        padding: 'clamp(2rem, 7vw, 4rem) clamp(1rem, 4vw, 2rem)',
      }}
      aria-labelledby="hours-heading"
    >
      <div
        className="hours-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 0.85fr) minmax(0, 1.15fr)',
          gap: 'clamp(1.25rem, 4vw, 2.5rem)',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            display: 'grid',
            alignContent: 'space-between',
            gap: '1rem',
            padding: 'clamp(1.4rem, 4vw, 2rem)',
            borderRadius: '22px',
            background: status.isOpen
              ? 'linear-gradient(135deg, #e8f0e8 0%, #ffffff 100%)'
              : 'linear-gradient(135deg, #fce7f0 0%, #ffffff 100%)',
            border: status.isOpen ? '1px solid rgba(107, 142, 111, 0.28)' : '1px solid rgba(214, 90, 140, 0.26)',
            boxShadow: '0 18px 44px rgba(42, 42, 42, 0.09)',
          }}
        >
          <div>
            <p
              style={{
                margin: '0 0 0.75rem',
                color: '#d65a8c',
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '0.88rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Hours of Operation
            </p>

            <h2
              id="hours-heading"
              style={{
                margin: '0 0 1rem',
                color: '#1a1a1a',
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.15rem, 6vw, 3.4rem)',
                lineHeight: 1,
                letterSpacing: '0',
              }}
            >
              Plan your bakery run.
            </h2>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.7rem',
                margin: '0.45rem 0 0.9rem',
                padding: '0.75rem 0.95rem',
                borderRadius: '999px',
                background: '#fff',
                border: status.isOpen ? '1px solid rgba(107, 142, 111, 0.32)' : '1px solid rgba(214, 90, 140, 0.3)',
                boxShadow: '0 8px 20px rgba(42, 42, 42, 0.06)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: status.isOpen ? '#6b8e6f' : '#d65a8c',
                  boxShadow: status.isOpen ? '0 0 0 6px rgba(107, 142, 111, 0.12)' : '0 0 0 6px rgba(214, 90, 140, 0.12)',
                }}
              />
              <strong
                style={{
                  color: status.isOpen ? '#2e5e3f' : '#a64c78',
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '1rem',
                }}
              >
                {status.statusText}
              </strong>
            </div>

            <p
              style={{
                margin: 0,
                color: '#5f5f5f',
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '1rem',
                lineHeight: 1.65,
                fontWeight: 600,
              }}
            >
              {status.detailText}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '0.85rem',
              marginTop: '1rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <FontAwesomeIcon icon={faMugHot} style={{ color: '#d65a8c', marginTop: '0.25rem' }} />
              <p style={{ margin: 0, color: '#6d6d6d', fontFamily: 'Quicksand, sans-serif', lineHeight: 1.55 }}>
                Cafe opens at 7:00 AM Tuesday-Friday and 8:00 AM Saturday.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <FontAwesomeIcon icon={faShoppingBag} style={{ color: '#6b8e6f', marginTop: '0.25rem' }} />
              <p style={{ margin: 0, color: '#6d6d6d', fontFamily: 'Quicksand, sans-serif', lineHeight: 1.55 }}>
                Online ordering starts at 8:00 AM Tuesday-Friday and 10:00 AM Saturday.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <FontAwesomeIcon icon={faLocationDot} style={{ color: '#c9a961', marginTop: '0.25rem' }} />
              <p style={{ margin: 0, color: '#6d6d6d', fontFamily: 'Quicksand, sans-serif', lineHeight: 1.55 }}>
                Visit us at 103 Main St, Pennington Gap, VA 24277.
              </p>
            </div>
          </div>
        </div>

        <div
          className="weekly-hours-card"
          style={{
            padding: 'clamp(1rem, 3vw, 1.35rem)',
            borderRadius: '22px',
            background: '#fff',
            border: '1px solid rgba(107, 142, 111, 0.18)',
            boxShadow: '0 18px 44px rgba(42, 42, 42, 0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '0.85rem',
            }}
          >
            <h3
              style={{
                margin: 0,
                color: '#1a1a1a',
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.45rem, 4vw, 2rem)',
              }}
            >
              Weekly Schedule
            </h3>
            <FontAwesomeIcon icon={faClock} style={{ color: '#d65a8c' }} />
          </div>

          <div style={{ display: 'grid', gap: '0.55rem' }}>
            {weeklyHours.map((item, index) => {
              const isToday = status.currentDay === index;
              return (
                <div
                  key={item.day}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1fr)',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.9rem 1rem',
                    borderRadius: '14px',
                    background: isToday ? 'linear-gradient(135deg, #fce7f0 0%, #e8f0e8 100%)' : '#fafaf8',
                    border: isToday ? '1px solid rgba(214, 90, 140, 0.32)' : '1px solid rgba(42, 42, 42, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0 }}>
                    {isToday ? (
                      <span
                        aria-hidden="true"
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: status.isOpen ? '#6b8e6f' : '#d65a8c',
                          flexShrink: 0,
                        }}
                      />
                    ) : null}
                    <strong
                      style={{
                        color: '#2a2a2a',
                        fontFamily: 'Quicksand, sans-serif',
                        fontSize: '0.98rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.day}
                    </strong>
                  </div>

                  <span
                    style={{
                      color: item.isClosed ? '#9a5d74' : '#4f4f4f',
                      fontFamily: 'Quicksand, sans-serif',
                      fontSize: '0.98rem',
                      fontWeight: 800,
                      textAlign: 'right',
                    }}
                  >
                    {item.hours}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hours-layout {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 560px) {
          .weekly-hours-card > div:last-child > div {
            grid-template-columns: 1fr !important;
            gap: 0.35rem !important;
          }

          .weekly-hours-card span {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Hours;
