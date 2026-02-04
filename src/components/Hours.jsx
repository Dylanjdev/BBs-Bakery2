// Hours.jsx - BB's Bakery & Cafe
import React, { useEffect, useState } from 'react';
import '../hours-fix.css';

function getOpenStatus() {
  const now = new Date();
  const day = now.getDay();
  const currentTime = now.getHours() + now.getMinutes() / 60;
  const isMondayToFriday = day >= 1 && day <= 5;
  const isSaturday = day === 6;
  const isOpen =
    (isMondayToFriday && currentTime >= 7 && currentTime < 14) ||
    (isSaturday && currentTime >= 8 && currentTime < 14);
  let statusText = '';
  if (isOpen) {
    statusText = 'OPEN NOW';
  } else {
    if (day === 0 || (day === 6 && currentTime >= 14)) {
      statusText = 'CLOSED - Opens Monday 7:00 AM';
    } else if (day === 6 && currentTime < 8) {
      statusText = 'CLOSED - Opens at 8:00 AM';
    } else if (currentTime < 7) {
      statusText = 'CLOSED - Opens at 7:00 AM';
    } else {
      statusText = 'CLOSED - Opens Tomorrow 7:00 AM';
    }
  }
  return { isOpen, statusText };
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
    <section id="hours" className="pv5 mw7 center" style={{padding: 'clamp(2.5rem, 10vw, 5rem) clamp(1rem, 3vw, 2rem)'}} aria-labelledby="hours-heading">
      <h2 
        id="hours-heading" 
        className="f2 fw7 tc mb5" 
        style={{
          fontFamily: 'Playfair Display, serif',
          background: 'linear-gradient(135deg, #d65a8c 0%, #6b8e6f 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.8px',
          fontSize: 'clamp(2rem, 6vw, 2.5rem)',
          marginBottom: '2rem'
        }}
      >
        ⏰ Hours of Operation
      </h2>
      
      {/* Status Badge */}
      <div 
        className="tc mb5 flex items-center justify-center" 
        style={{
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          background: status.isOpen 
            ? 'linear-gradient(135deg, #e8f0e8 0%, #f0fdf4 100%)' 
            : 'linear-gradient(135deg, #fce7f0 0%, #fff0f7 100%)',
          borderRadius: '25px',
          maxWidth: '450px',
          margin: '0 auto 3rem',
          border: status.isOpen ? '3px solid #6b8e6f' : '3px solid #d65a8c',
          boxShadow: status.isOpen 
            ? '0 8px 30px rgba(107, 142, 111, 0.2)' 
            : '0 8px 30px rgba(214, 90, 140, 0.2)',
          transition: 'all 0.35s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        <span 
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: status.isOpen ? '#6b8e6f' : '#d65a8c',
            marginRight: '1rem',
            boxShadow: status.isOpen 
              ? '0 0 12px rgba(107, 142, 111, 0.6)' 
              : '0 0 12px rgba(214, 90, 140, 0.6)',
            animation: status.isOpen ? 'pulse 2s ease-in-out infinite' : 'none'
          }}
        ></span>
        <span 
          style={{
            fontWeight: '800',
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            color: status.isOpen ? '#2e5e3f' : '#a64c78',
            fontFamily: 'Playfair Display, serif',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap'
          }}
        >
          {status.statusText}
        </span>
      </div>
      
      {/* Hours Grid */}
      <div 
        className="tc hours-grid"
      >
        <div 
          className="br4 pa4" 
          style={{
            background: 'linear-gradient(135deg, #fce7f0 0%, rgba(255, 255, 255, 0.8) 100%)',
            boxShadow: '0 8px 24px rgba(214, 90, 140, 0.1)',
            border: '2px solid #d65a8c',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            padding: 'clamp(1.5rem, 4vw, 1.75rem)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 14px 40px rgba(214, 90, 140, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(214, 90, 140, 0.1)';
          }}
        >
          <p 
            className="f5 fw7 mb3" 
            style={{
              color: '#d65a8c',
              fontFamily: 'Playfair Display, serif',
              margin: '0 0 1rem 0',
              fontSize: '1rem'
            }}
          >
            Monday - Friday
          </p>
          <p 
            className="f3 fw7" 
            style={{
              color: '#1a1a1a',
              fontFamily: 'Playfair Display, serif',
              margin: '0',
              fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
              letterSpacing: '0.3px'
            }}
          >
            7:00 AM – 2:00 PM
          </p>
        </div>
        
        <div 
          className="br4" 
          style={{
            background: 'linear-gradient(135deg, #e8f0e8 0%, rgba(255, 255, 255, 0.8) 100%)',
            boxShadow: '0 8px 24px rgba(107, 142, 111, 0.1)',
            border: '2px solid #6b8e6f',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            padding: 'clamp(1.5rem, 4vw, 1.75rem)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 14px 40px rgba(107, 142, 111, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(107, 142, 111, 0.1)';
          }}
        >
          <p 
            className="f5 fw7 mb3" 
            style={{
              color: '#6b8e6f',
              fontFamily: 'Playfair Display, serif',
              margin: '0 0 1rem 0',
              fontSize: '1rem'
            }}
          >
            Saturday
          </p>
          <p 
            className="f3 fw7" 
            style={{
              color: '#1a1a1a',
              fontFamily: 'Playfair Display, serif',
              margin: '0',
              fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
              letterSpacing: '0.3px'
            }}
          >
            8:00 AM – 2:00 PM
          </p>
        </div>
        
        <div 
          className="br4" 
          style={{
            background: 'linear-gradient(135deg, #fef3e8 0%, rgba(255, 255, 255, 0.8) 100%)',
            boxShadow: '0 8px 24px rgba(201, 169, 97, 0.1)',
            border: '2px solid #c9a961',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            gridColumn: 'span auto',
            padding: 'clamp(1.5rem, 4vw, 1.75rem)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 14px 40px rgba(201, 169, 97, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 169, 97, 0.1)';
          }}
        >
          <p 
            className="f5 fw7 mb3" 
            style={{
              color: '#c9a961',
              fontFamily: 'Playfair Display, serif',
              margin: '0 0 1rem 0',
              fontSize: '1rem'
            }}
          >
            Sunday
          </p>
          <p 
            className="f3 fw7" 
            style={{
              color: '#1a1a1a',
              fontFamily: 'Playfair Display, serif',
              margin: '0',
              fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
              letterSpacing: '0.3px'
            }}
          >
            Closed 😴
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 12px rgba(107, 142, 111, 0.6);
          }
          50% {
            opacity: 0.7;
            box-shadow: 0 0 8px rgba(107, 142, 111, 0.4);
          }
        }
      `}</style>
    </section>
  );
}

export default Hours;
