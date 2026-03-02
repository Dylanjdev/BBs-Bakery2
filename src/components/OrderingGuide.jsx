function OrderingGuide() {
  return (
    <section 
      id="how-to-order"
      style={{
        width: '100%',
        padding: 'clamp(2rem, 8vw, 4rem) clamp(1rem, 5vw, 2rem)',
        backgroundColor: '#fafaf8',
        boxSizing: 'border-box',
        minHeight: 'auto'
      }}
    >
      <div style={{maxWidth: '100%', boxSizing: 'border-box', padding: '0'}}>
        <h3 
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '1rem',
            color: '#1a1a1a',
            letterSpacing: '-0.5px'
          }}
        >
          📦 How to Order
        </h3>
        
        <p 
          style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
            color: '#666',
            fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
            maxWidth: '100%',
            margin: '0 auto 2.5rem',
            padding: '0',
            boxSizing: 'border-box'
          }}
        >
          We offer custom orders with specific ordering and pickup windows each day. Place your order before the cutoff time to ensure your items are ready during the pickup window.
        </p>

        {/* Ordering Process Cards */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(1rem, 3vw, 2rem)', maxWidth: '100%', margin: '0 auto 3rem', padding: '0', boxSizing: 'border-box'}}>
          {/* Monday-Friday Card */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #fce7f0 0%, rgba(255, 255, 255, 0.95) 100%)',
              border: '2px solid #d65a8c',
              borderRadius: '12px',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              boxShadow: '0 8px 24px rgba(214, 90, 140, 0.1)',
              boxSizing: 'border-box',
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            <h4 style={{fontFamily: 'Playfair Display, serif', color: '#d65a8c', fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', fontWeight: '700', margin: '0 0 1.5rem 0'}}>Monday – Friday</h4>
            
            <div style={{marginBottom: '1.5rem'}}>
              <p style={{fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#999', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 0.5rem 0', letterSpacing: '0.5px'}}>Orders Open</p>
              <p style={{fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', fontWeight: '700', color: '#d65a8c', margin: '0', fontFamily: 'Playfair Display, serif'}}>7:30 AM</p>
            </div>

            <div style={{marginBottom: '1.5rem'}}>
              <p style={{fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#999', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 0.5rem 0', letterSpacing: '0.5px'}}>Order Cutoff</p>
              <p style={{fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', fontWeight: '700', color: '#d65a8c', margin: '0', fontFamily: 'Playfair Display, serif'}}>1:30 PM</p>
              <p style={{fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#666', margin: '0.5rem 0 0 0'}}>Orders placed after this time cannot be guaranteed</p>
            </div>

            <div>
              <p style={{fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#999', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 0.5rem 0', letterSpacing: '0.5px'}}>Ready for Pickup</p>
              <p style={{fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', fontWeight: '700', color: '#6b8e6f', margin: '0', fontFamily: 'Playfair Display, serif'}}>7:30 AM – 1:45 PM</p>
              <p style={{fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#666', margin: '0.5rem 0 0 0'}}>Come pick up your fresh order anytime during this window</p>
            </div>
          </div>

          {/* Saturday Card */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #e8f0e8 0%, rgba(255, 255, 255, 0.95) 100%)',
              border: '2px solid #6b8e6f',
              borderRadius: '12px',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              boxShadow: '0 8px 24px rgba(107, 142, 111, 0.1)',
              boxSizing: 'border-box',
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            <h4 style={{fontFamily: 'Playfair Display, serif', color: '#6b8e6f', fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', fontWeight: '700', margin: '0 0 1.5rem 0'}}>Saturday</h4>
            
            <div style={{marginBottom: '1.5rem'}}>
              <p style={{fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#999', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 0.5rem 0', letterSpacing: '0.5px'}}>Orders Open</p>
              <p style={{fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', fontWeight: '700', color: '#6b8e6f', margin: '0', fontFamily: 'Playfair Display, serif'}}>8:30 AM</p>
            </div>

            <div style={{marginBottom: '1.5rem'}}>
              <p style={{fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#999', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 0.5rem 0', letterSpacing: '0.5px'}}>Order Cutoff</p>
              <p style={{fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', fontWeight: '700', color: '#6b8e6f', margin: '0', fontFamily: 'Playfair Display, serif'}}>1:30 PM</p>
              <p style={{fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#666', margin: '0.5rem 0 0 0'}}>Orders placed after this time cannot be guaranteed</p>
            </div>

            <div>
              <p style={{fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#999', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 0.5rem 0', letterSpacing: '0.5px'}}>Ready for Pickup</p>
              <p style={{fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', fontWeight: '700', color: '#6b8e6f', margin: '0', fontFamily: 'Playfair Display, serif'}}>8:30 AM – 1:45 PM</p>
              <p style={{fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#666', margin: '0.5rem 0 0 0'}}>Come pick up your fresh order anytime during this window</p>
            </div>
          </div>

          {/* Sunday Card */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #fef3e8 0%, rgba(255, 255, 255, 0.95) 100%)',
              border: '2px solid #c9a961',
              borderRadius: '12px',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              boxShadow: '0 8px 24px rgba(201, 169, 97, 0.1)',
              boxSizing: 'border-box',
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            <h4 style={{fontFamily: 'Playfair Display, serif', color: '#c9a961', fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', fontWeight: '700', margin: '0 0 1.5rem 0'}}>Sunday</h4>
            
            <div style={{textAlign: 'center', padding: '2rem 0'}}>
              <p style={{fontSize: 'clamp(2rem, 5vw, 3rem)', margin: '0 0 1rem 0'}}>😴</p>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.1rem)', fontWeight: '700', color: '#c9a961', margin: '0', fontFamily: 'Playfair Display, serif'}}>We're Closed</p>
              <p style={{fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', color: '#666', margin: '0.75rem 0 0 0'}}>Come back and see us Monday!</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div 
          style={{
            background: 'linear-gradient(135deg, rgba(107, 142, 111, 0.05) 0%, rgba(214, 90, 140, 0.05) 100%)',
            border: '2px solid rgba(107, 142, 111, 0.2)',
            borderRadius: '12px',
            padding: 'clamp(1.25rem, 3vw, 2rem)',
            maxWidth: '100%',
            margin: '2rem auto',
            textAlign: 'center',
            boxSizing: 'border-box'
          }}
        >
          <p style={{margin: '0 0 1rem 0', fontSize: 'clamp(0.95rem, 3vw, 1.05rem)', fontWeight: '600', color: '#1a1a1a'}}>✨ Custom Orders Welcome ✨</p>
          <p style={{margin: '0', color: '#555', lineHeight: '1.6', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'}}>
            Have a special request or need something not on our menu? Contact us before 1:30 PM (cutoff time) to discuss custom orders. We love creating baked goods tailored to your needs!
          </p>
        </div>
      </div>
    </section>
  );
}

export default OrderingGuide;
