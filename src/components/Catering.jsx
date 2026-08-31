import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBreadSlice,
  faBuilding,
  faCakeCandles,
  faCalendarCheck,
  faCheck,
  faClock,
  faEnvelope,
  faLocationDot,
  faMugHot,
  faPhone,
  faUsers,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import '../catering.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdabeylq';

const menuGroups = [
  {
    icon: faMugHot,
    eyebrow: 'Morning meetings',
    title: 'Breakfast & Coffee',
    text: 'Build an easy morning spread with a mix of fresh bakery favorites and drinks.',
    items: ['Muffins and scones', 'Cinnamon rolls and donuts', 'Croissants and danishes', 'Coffee options by request'],
  },
  {
    icon: faUtensils,
    eyebrow: 'Workdays & gatherings',
    title: 'Lunch Favorites',
    text: 'Choose handheld cafe favorites that work well for meetings, team lunches, and casual events.',
    items: ['Chicken salad croissants', "BB's croissant clubs", 'Italian wraps', 'Buffalo chicken wraps'],
  },
  {
    icon: faCakeCandles,
    eyebrow: 'A sweet finish',
    title: 'Desserts & Celebrations',
    text: 'Add shareable bakery treats or pair your catering request with a custom celebration cake.',
    items: ['Brownies and cupcakes', 'Mini Bundt cakes', 'Mini loaves and pastries', 'Custom cakes with advance notice'],
  },
];

const eventTypes = [
  {
    icon: faBuilding,
    title: 'Office & Corporate Catering',
    text: 'Breakfast meetings, staff appreciation, training days, client visits, and team lunches.',
  },
  {
    icon: faCakeCandles,
    title: 'Showers & Celebrations',
    text: 'Birthdays, baby showers, bridal showers, graduations, anniversaries, and family parties.',
  },
  {
    icon: faUsers,
    title: 'Community Gatherings',
    text: 'Church groups, school functions, club meetings, volunteer events, and local get-togethers.',
  },
];

const planningRows = [
  {
    occasion: 'Coffee break',
    startingPoint: '1 bakery item per guest',
    tip: 'Choose two or three varieties so the group has options.',
  },
  {
    occasion: 'Breakfast spread',
    startingPoint: '1½–2 bakery items per guest',
    tip: 'Mix lighter pastries with a more filling choice.',
  },
  {
    occasion: 'Lunch',
    startingPoint: '1 sandwich or wrap per guest',
    tip: 'Add a small buffer when preferences are unknown.',
  },
  {
    occasion: 'Dessert table',
    startingPoint: '1–2 sweets per guest',
    tip: 'Plan more variety when desserts are the main feature.',
  },
];

const faqs = [
  {
    question: "Does BB's Bakery & Cafe offer catering in Pennington Gap, VA?",
    answer: "Yes. BB's prepares bakery and cafe catering orders for offices, parties, showers, meetings, and community events in Pennington Gap, Lee County, and the surrounding Southwest Virginia area. Availability and final menu selections are confirmed for each event.",
  },
  {
    question: 'How far ahead should I place a catering order?',
    answer: 'Contact the bakery as soon as your guest count and date are known. Larger orders, specialty requests, and busy dates need more planning time. Custom cake requests require at least 14 days of notice. Sending a request does not reserve a date until the bakery confirms it.',
  },
  {
    question: 'Can I order breakfast catering for an office or meeting?',
    answer: 'Yes. Breakfast catering can include a mix of muffins, scones, cinnamon rolls, donuts, croissants, danishes, and drink options, depending on availability. Share your start time and group size so the bakery can recommend a practical mix.',
  },
  {
    question: 'Do you offer lunch catering?',
    answer: "Lunch requests can include cafe favorites such as chicken salad croissants, croissant clubs, Italian wraps, and buffalo chicken wraps. The bakery will confirm which selections and quantities are available for your date.",
  },
  {
    question: 'Can you accommodate dietary restrictions or food allergies?',
    answer: 'Include every dietary need and allergy in your request before ordering. The bakery can explain ingredients and discuss available options, but some requests may not be possible and the kitchen handles common allergens. Never assume an item is allergen-free without direct confirmation.',
  },
  {
    question: 'Is catering pickup or delivery?',
    answer: "Plan to pick up your confirmed order at BB's Bakery & Cafe, 103 Main St in Pennington Gap. If your event has different logistical needs, include them in the request so the bakery can tell you what may be possible.",
  },
  {
    question: 'How much does bakery catering cost?',
    answer: 'Pricing depends on the menu, quantities, customization, and event details. Submit the catering form with your guest count and preferred items, and the bakery will follow up with availability and pricing before the order is finalized.',
  },
];

const cateringSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://bbs-bakery.com/catering#service',
      name: 'Bakery and Cafe Catering',
      serviceType: 'Bakery catering, breakfast catering, lunch catering, and dessert catering',
      url: 'https://bbs-bakery.com/catering',
      description: "Fresh bakery, breakfast, lunch, dessert, office, and event catering from BB's Bakery & Cafe in Pennington Gap, Virginia.",
      provider: {
        '@type': 'Bakery',
        name: "BB's Bakery & Cafe",
        telephone: '+1-276-537-0189',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '103 Main St',
          addressLocality: 'Pennington Gap',
          addressRegion: 'VA',
          postalCode: '24277',
          addressCountry: 'US',
        },
      },
      areaServed: [
        { '@type': 'City', name: 'Pennington Gap' },
        { '@type': 'AdministrativeArea', name: 'Lee County, Virginia' },
        { '@type': 'Place', name: 'Southwest Virginia' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://bbs-bakery.com/catering#faq',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

function getTodayString() {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60000;
  return new Date(today.getTime() - timezoneOffset).toISOString().split('T')[0];
}

function Catering() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.dataset.routeSchema = 'catering';
    schema.textContent = JSON.stringify(cateringSchema);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('_subject', 'New Catering Request');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.errors?.[0]?.message || 'Unable to send your request right now. Please try again in a few minutes.';
        throw new Error(message);
      }

      form.reset();
      setStatus({
        type: 'success',
        message: "Thanks! Your catering request was sent. BB's will follow up to confirm availability, menu details, and pricing.",
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong while sending your request.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="catering-page">
      <section className="catering-hero" aria-labelledby="catering-heading">
        <div className="catering-hero__copy">
          <p className="catering-kicker">Local Catering In Pennington Gap, Virginia</p>
          <h1 id="catering-heading">Bakery catering that makes gathering feel easy.</h1>
          <p className="catering-hero__lead">
            Fresh pastries for an early meeting, cafe favorites for a team lunch, or desserts for a celebration—BB&apos;s Bakery &amp; Cafe will help you plan a crowd-pleasing order for your guest count and occasion.
          </p>

          <div className="catering-actions" aria-label="Catering contact options">
            <a className="catering-button catering-button--primary" href="#catering-request">
              <FontAwesomeIcon icon={faCalendarCheck} />
              Request Catering
            </a>
            <a className="catering-button catering-button--secondary" href="tel:2765370189">
              <FontAwesomeIcon icon={faPhone} />
              Call (276) 537-0189
            </a>
          </div>

          <ul className="catering-hero__intent-list" aria-label="Popular catering requests">
            <li><FontAwesomeIcon icon={faCheck} /> Office breakfasts</li>
            <li><FontAwesomeIcon icon={faCheck} /> Meetings &amp; team lunches</li>
            <li><FontAwesomeIcon icon={faCheck} /> Showers, parties &amp; desserts</li>
          </ul>
        </div>

        <figure className="catering-hero__image">
          <img
            src="/assets/images/CoverPhoto.webp"
            alt="Fresh baked pastries and cafe favorites from BB's Bakery and Cafe in Pennington Gap"
            width="1200"
            height="600"
            loading="eager"
            decoding="async"
          />
          <figcaption>
            <span><FontAwesomeIcon icon={faLocationDot} /> Local pickup</span>
            <strong>103 Main St, Pennington Gap</strong>
          </figcaption>
        </figure>
      </section>

      <nav className="catering-jump-links" aria-label="Catering page sections">
        <span>Plan your order:</span>
        <a href="#catering-menu">Menu Ideas</a>
        <a href="#catering-events">Event Types</a>
        <a href="#catering-quantity-guide">Quantity Guide</a>
        <a href="#catering-faq">FAQs</a>
        <a href="#catering-request">Get a Quote</a>
      </nav>

      <section id="catering-menu" className="catering-section" aria-labelledby="catering-menu-heading">
        <div className="catering-section__heading">
          <p className="catering-kicker">Catering Menu Ideas</p>
          <h2 id="catering-menu-heading">Start with the kind of gathering you are planning.</h2>
          <p>
            Daily bakery selections can vary. These ideas use favorites from our current bakery and cafe menu; your final options, quantities, and pricing will be confirmed for your date.
          </p>
        </div>

        <div className="catering-menu-grid">
          {menuGroups.map((group) => (
            <article className="catering-menu-card" key={group.title}>
              <div className="catering-card-icon"><FontAwesomeIcon icon={group.icon} /></div>
              <p>{group.eyebrow}</p>
              <h3>{group.title}</h3>
              <span>{group.text}</span>
              <ul>
                {group.items.map((item) => <li key={item}><FontAwesomeIcon icon={faCheck} /> {item}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <p className="catering-menu-note">
          Looking for current individual items and prices? <a href="/menu">Browse the bakery and cafe menu</a>. For a decorated centerpiece, <a href="/custom-cakes">review custom cake details</a> before submitting your catering request.
        </p>
      </section>

      <section id="catering-events" className="catering-section catering-events" aria-labelledby="catering-events-heading">
        <div className="catering-section__heading catering-section__heading--left">
          <p className="catering-kicker">Catering For Every Kind Of Day</p>
          <h2 id="catering-events-heading">From first coffee to the last cupcake.</h2>
          <p>
            Tell us how the food will be served, what time guests arrive, and whether you prefer a simple single-item order or a varied spread. Those details help us recommend the right mix.
          </p>
        </div>

        <div className="catering-event-list">
          {eventTypes.map((event) => (
            <article key={event.title}>
              <FontAwesomeIcon icon={event.icon} />
              <div>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="catering-quantity-guide" className="catering-section catering-planner" aria-labelledby="catering-planner-heading">
        <div className="catering-planner__intro">
          <p className="catering-kicker">Catering Quantity Guide</p>
          <h2 id="catering-planner-heading">A practical starting point for how much to order.</h2>
          <p>
            Every crowd is different, but these estimates can help you begin. Tell us the number of adults and children, event length, time of day, and whether other food will be served for a more useful recommendation.
          </p>

          <aside className="catering-planner__tip">
            <FontAwesomeIcon icon={faClock} />
            <div>
              <strong>Order early when you can.</strong>
              <span>Large orders, specialty items, and popular dates need more planning. Custom cakes require at least 14 days&apos; notice.</span>
            </div>
          </aside>
        </div>

        <div className="catering-table-wrap">
          <table>
            <caption>Suggested starting quantities by catering occasion</caption>
            <thead>
              <tr>
                <th scope="col">Occasion</th>
                <th scope="col">Starting estimate</th>
                <th scope="col">Planning tip</th>
              </tr>
            </thead>
            <tbody>
              {planningRows.map((row) => (
                <tr key={row.occasion}>
                  <th scope="row">{row.occasion}</th>
                  <td>{row.startingPoint}</td>
                  <td>{row.tip}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>These are planning estimates, not fixed packages or minimums. BB&apos;s will help you adjust the order to your event.</p>
        </div>
      </section>

      <section className="catering-section catering-details" aria-labelledby="catering-details-heading">
        <div>
          <p className="catering-kicker">Before You Order</p>
          <h2 id="catering-details-heading">The details that help us build a better catering quote.</h2>
        </div>
        <ul>
          <li><strong>Date and pickup time</strong><span>Include when guests will eat, not only when the event begins.</span></li>
          <li><strong>Accurate guest count</strong><span>Note adults, children, and whether the count is still changing.</span></li>
          <li><strong>Menu priorities</strong><span>Share must-have items, flavors to avoid, and how much variety you want.</span></li>
          <li><strong>Dietary needs</strong><span>List allergies and restrictions clearly so we can discuss available options.</span></li>
          <li><strong>Event setup</strong><span>Tell us whether this is a quick meeting, full meal, dessert table, or open-house style event.</span></li>
        </ul>
      </section>

      <section id="catering-faq" className="catering-section catering-faq" aria-labelledby="catering-faq-heading">
        <div className="catering-section__heading">
          <p className="catering-kicker">Catering FAQ</p>
          <h2 id="catering-faq-heading">Answers before you request a quote.</h2>
        </div>
        <div className="catering-faq__list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="catering-request" className="catering-section catering-request" aria-labelledby="catering-request-heading">
        <div className="catering-request__intro">
          <p className="catering-kicker">Request A Catering Quote</p>
          <h2 id="catering-request-heading">Tell us what you are planning.</h2>
          <p>
            Share as much as you know. We will follow up to confirm availability, menu choices, pricing, and pickup timing. Your request is not booked until BB&apos;s confirms it with you.
          </p>

          <div className="catering-contact-card">
            <a href="tel:2765370189"><FontAwesomeIcon icon={faPhone} /><span><small>Call the bakery</small>(276) 537-0189</span></a>
            <a href="mailto:bbscafe25@outlook.com"><FontAwesomeIcon icon={faEnvelope} /><span><small>Email</small>bbscafe25@outlook.com</span></a>
            <p><FontAwesomeIcon icon={faLocationDot} /><span><small>Pickup address</small>103 Main St<br />Pennington Gap, VA 24277</span></p>
          </div>
        </div>

        <form className="catering-form" onSubmit={handleSubmit}>
          <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="catering-honeypot" aria-hidden="true" />

          <div className="catering-form__grid">
            <label>
              Full Name
              <input type="text" name="name" autoComplete="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" autoComplete="email" required placeholder="you@email.com" />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" autoComplete="tel" required placeholder="(276) 555-1234" />
            </label>
            <label>
              Event Date
              <input type="date" name="eventDate" min={getTodayString()} required />
            </label>
            <label>
              Event Type
              <select name="eventType" defaultValue="" required>
                <option value="" disabled>Select an event</option>
                <option value="office-meeting">Office meeting or training</option>
                <option value="team-breakfast">Team breakfast</option>
                <option value="team-lunch">Team lunch</option>
                <option value="birthday">Birthday</option>
                <option value="shower">Baby or bridal shower</option>
                <option value="graduation">Graduation</option>
                <option value="church-community">Church or community event</option>
                <option value="other">Other gathering</option>
              </select>
            </label>
            <label>
              Estimated Guests
              <input type="number" name="guestCount" inputMode="numeric" min="1" required placeholder="How many people?" />
            </label>
            <label>
              Preferred Pickup Time
              <input type="time" name="pickupTime" />
            </label>
            <label>
              Budget Range <span>(optional)</span>
              <select name="budget" defaultValue="">
                <option value="">Select a range</option>
                <option value="under-100">Under $100</option>
                <option value="100-200">$100–$200</option>
                <option value="201-350">$201–$350</option>
                <option value="351-500">$351–$500</option>
                <option value="500-plus">$500+</option>
                <option value="unsure">Not sure yet</option>
              </select>
            </label>
          </div>

          <fieldset>
            <legend>What are you interested in?</legend>
            <div className="catering-form__checks">
              <label><input type="checkbox" name="cateringInterests" value="breakfast-pastries" /> Breakfast pastries</label>
              <label><input type="checkbox" name="cateringInterests" value="coffee-drinks" /> Coffee or drinks</label>
              <label><input type="checkbox" name="cateringInterests" value="lunch" /> Sandwiches or wraps</label>
              <label><input type="checkbox" name="cateringInterests" value="desserts" /> Desserts or treats</label>
              <label><input type="checkbox" name="cateringInterests" value="custom-cake" /> Custom cake</label>
              <label><input type="checkbox" name="cateringInterests" value="recommendation" /> Bakery recommendation</label>
            </div>
          </fieldset>

          <label className="catering-form__full">
            Event Details, Menu Ideas &amp; Dietary Needs
            <textarea
              name="details"
              rows="6"
              required
              placeholder="Tell us when guests will eat, menu ideas, allergies or dietary restrictions, and anything else that will help us understand the event."
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            <FontAwesomeIcon icon={faBreadSlice} />
            {isSubmitting ? 'Sending Request…' : 'Send Catering Request'}
          </button>

          {status.message && (
            <p className={`catering-form__status catering-form__status--${status.type}`} role="status">
              {status.message}
            </p>
          )}
          <p className="catering-form__fine-print">Submitting this form is a request, not a confirmed order or reservation.</p>
        </form>
      </section>
    </article>
  );
}

export default Catering;
