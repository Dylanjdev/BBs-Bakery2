import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCakeCandles,
  faCalendarCheck,
  faCamera,
  faClock,
  faEnvelopeOpenText,
  faImages,
  faPhone,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';
import '../custom-cake.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdabeylq';

const BLOCKED_DATES = [
  '2026-05-29', // fully booked
  '2026-11-25',
  '2026-11-26',
  '2026-11-27',
  '2026-11-28',
  '2026-11-29',
  '2026-11-30',
];

const processSteps = [
  {
    icon: faImages,
    title: 'Send The Idea',
    text: 'Share your date, servings, flavors, wording, colors, and any inspiration photos.',
  },
  {
    icon: faEnvelopeOpenText,
    title: 'We Follow Up',
    text: 'The bakery will confirm availability, pricing, design details, and pickup timing.',
  },
  {
    icon: faCakeCandles,
    title: 'Pick Up & Celebrate',
    text: 'Custom cakes are preorder only and picked up from BB\'s Bakery & Cafe on Main Street.',
  },
];

const cakeNotes = [
  { icon: faClock, text: 'Please request custom cakes at least 14 days ahead.' },
  { icon: faCamera, text: 'Upload a few photos so we can understand your style.' },
  { icon: faPhone, text: 'Need help before submitting? Call (276) 537-0189.' },
];

const cakeGallery = [
  {
    src: '/assets/images/white-vintage-tiered-cake.jpg',
    alt: 'Two-tier white vintage piped celebration cake made by BB\'s Bakery',
    label: 'Vintage tiered cake',
  },
  {
    src: '/assets/images/pink-vintage-cake.jpg',
    alt: 'Pink and white vintage piped custom cake',
    label: 'Pink vintage piping',
  },
  {
    src: '/assets/images/strawberry-cat-cake.jpg',
    alt: 'Cat-themed custom cake with strawberries and buttercream decorations',
    label: 'Themed birthday cake',
  },
  {
    src: '/assets/images/chocolate-candy-cake.jpg',
    alt: 'Chocolate birthday cake covered in chocolate candy pieces',
    label: 'Chocolate candy cake',
  },
  {
    src: '/assets/images/oatmeal-cream-pie-cake.jpg',
    alt: 'Custom cake topped with oatmeal cream pies and piped buttercream',
    label: 'Oatmeal cream pie cake',
  },
  {
    src: '/assets/images/race-car-birthday-cake.jpg',
    alt: 'Custom race car birthday cake with toy cars and checkered flags',
    label: 'Race car birthday cake',
  },
];

const cakeFaqs = [
  {
    question: 'How far ahead should I order a custom cake?',
    answer: 'Please submit your request at least 14 days before your event. More notice is helpful for larger, tiered, or highly detailed designs.',
  },
  {
    question: 'Where do I pick up my custom cake?',
    answer: "Custom cake pickup is at BB's Bakery & Cafe, 103 Main St in Pennington Gap, Virginia. We will confirm the pickup time with your order.",
  },
  {
    question: 'Can I send inspiration photos?',
    answer: 'Yes. Use the request form to upload a few photos and tell us which colors, piping, theme, or design details you like.',
  },
  {
    question: 'Is submitting the form a confirmed order?',
    answer: 'Not yet. The bakery will follow up to confirm availability, final design, price, and pickup details before your order is booked.',
  },
  {
    question: 'Do custom cakes ship or get delivered?',
    answer: "Custom cakes are pickup-only from BB's Bakery & Cafe on Main Street in Pennington Gap. Your confirmed order will include a pickup time.",
  },
  {
    question: 'Can you copy an inspiration cake exactly?',
    answer: 'Inspiration photos help us understand the look you love. We will use them as a direction and confirm the design BB\'s Bakery can create for your cake.',
  },
  {
    question: 'What affects the price of a custom cake?',
    answer: 'Serving count, number of tiers, design complexity, flavor and filling choices, and specialty decorative details all help determine the final quote.',
  },
  {
    question: 'Can I ask about an allergy or dietary need?',
    answer: 'Yes. Include the details in your request so the bakery can discuss ingredients and what may be possible. A request does not guarantee an allergen-free cake.',
  },
];

const cakeStyles = [
  {
    number: '01',
    title: 'Vintage Piping',
    text: 'Layered borders, delicate swags, shell details, and a color palette that can feel romantic, playful, or wonderfully retro.',
  },
  {
    number: '02',
    title: 'Themed Birthdays',
    text: 'Build the design around a favorite character, hobby, color story, or party theme, then add personalized wording for the guest of honor.',
  },
  {
    number: '03',
    title: 'Tiered Celebrations',
    text: 'Create extra presence for showers, anniversaries, milestone birthdays, and larger gatherings with a coordinated tiered design.',
  },
  {
    number: '04',
    title: 'Cake & Cupcake Sets',
    text: 'Ask about pairing a centerpiece cake with coordinated cupcakes when you want easier serving or a little more variety on the dessert table.',
  },
];

const servingRanges = [
  {
    range: '10–15',
    label: 'Small gathering',
    text: 'A close family birthday, dinner, or intimate celebration.',
  },
  {
    range: '16–25',
    label: 'Classic party',
    text: 'A typical birthday, shower, or small office celebration.',
  },
  {
    range: '26–40',
    label: 'Bigger celebration',
    text: 'More guests, more design room, and possible tiered options.',
  },
  {
    range: '41–60+',
    label: 'Large event',
    text: 'A larger guest list that needs early planning and a custom recommendation.',
  },
];

const quoteFactors = [
  'How many guests the cake should serve',
  'Single-tier or multi-tier construction',
  'Piping, colors, artwork, and design complexity',
  'Cake flavor, filling, and frosting requests',
  'Specialty decorations and personalized details',
];

function getMinLeadDateString() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 14);
  return date.toISOString().split('T')[0];
}

function CustomCakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const minLeadDate = getMinLeadDateString();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files.map((file) => file.name));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const form = event.currentTarget;
    const selectedEventDate = form.elements.eventDate?.value;

    if (!selectedEventDate || selectedEventDate < minLeadDate) {
      setStatus({
        type: 'error',
        message: `Custom cakes require at least 2 weeks notice. Please choose ${minLeadDate} or later.`,
      });
      return;
    }

    if (BLOCKED_DATES.includes(selectedEventDate)) {
      setStatus({
        type: 'error',
        message: 'Sorry, we are fully booked for custom cakes on that date. Please choose a different date.',
      });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(form);
    formData.append('_subject', 'New Custom Cake Request');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const errorMessage = data?.errors?.[0]?.message || 'Unable to send your request right now. Please try again in a few minutes.';
        throw new Error(errorMessage);
      }

      form.reset();
      setSelectedFiles([]);
      setStatus({
        type: 'success',
        message: "Thanks! We got your custom cake request and will reach out soon to confirm details.",
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
    <section id="custom-cakes" className="custom-cake-section" aria-labelledby="custom-cakes-heading">
      <div className="custom-cake-shell">
        <div className="custom-cake-hero">
          <div className="custom-cake-intro">
            <p className="custom-cake-kicker">Custom Cakes In Pennington Gap</p>
            <h1 id="custom-cakes-heading">Custom cakes made for your biggest moments.</h1>
            <p>
              Request custom birthday cakes, themed cakes, tiered celebration cakes, and cupcakes from our bakery in
              Pennington Gap, Virginia. Tell us what you are dreaming up and we will follow up to confirm availability,
              pricing, design details, and pickup timing.
            </p>

            <div className="custom-cake-actions" aria-label="Custom cake contact actions">
              <a href="#custom-cake-request-form" className="custom-cake-primary-link">
                <FontAwesomeIcon icon={faWandMagicSparkles} />
                Start Request
              </a>
              <a href="tel:2765370189" className="custom-cake-secondary-link">
                <FontAwesomeIcon icon={faPhone} />
                Call Bakery
              </a>
            </div>
          </div>

          <div className="custom-cake-photo-stack" aria-label="Custom cake examples">
            <figure className="custom-cake-feature-photo">
              <img
                src="/assets/images/blackberry-pomegranate-tiered-cake.jpg"
                alt="Custom tiered cake with blackberries and pomegranate made by BB's Bakery"
                width="900"
                height="1200"
                loading="eager"
                decoding="async"
              />
              <figcaption>Custom cakes handcrafted in Pennington Gap</figcaption>
            </figure>
            <figure className="custom-cake-small-photo">
              <img
                src="/assets/images/pink-vintage-cake.jpg"
                alt="Pink vintage piped custom cake from BB's Bakery"
                width="900"
                height="1200"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>

        <div className="custom-cake-process" aria-label="How custom cake requests work">
          {processSteps.map((step) => (
            <article key={step.title}>
              <span>
                <FontAwesomeIcon icon={step.icon} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <section className="custom-cake-showcase" aria-labelledby="custom-cake-showcase-heading">
          <div className="custom-cake-showcase-copy">
            <p className="custom-cake-kicker">Made Locally</p>
            <h2 id="custom-cake-showcase-heading">Custom birthday and celebration cakes in Pennington Gap, VA</h2>
            <p>
              Every request begins with your occasion, guest count, favorite flavors, and design inspiration. We make
              cakes for birthdays, baby showers, anniversaries, office celebrations, and other special events for
              customers across Lee County and Southwest Virginia.
            </p>
            <p>
              Custom cakes are preorder-only and available for pickup at our Main Street bakery. Share your ideas below,
              and our team will help shape the size, style, colors, and details into a cake that fits your celebration.
            </p>
          </div>

          <div className="custom-cake-gallery" aria-label="Recent custom cake designs">
            {cakeGallery.map((cake) => (
              <figure key={cake.src}>
                <img
                  src={cake.src}
                  alt={cake.alt}
                  width="900"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{cake.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="custom-cake-styles" aria-labelledby="custom-cake-styles-heading">
          <div className="custom-cake-section-heading">
            <p className="custom-cake-kicker">Find Your Direction</p>
            <h2 id="custom-cake-styles-heading">Start with a style, then make it completely yours.</h2>
            <p>
              You do not need to know every detail before reaching out. Choose the kind of feeling you want, share a few
              references, and tell us which parts matter most. We will confirm what works for your date, servings, and budget.
            </p>
          </div>

          <div className="custom-cake-style-grid">
            {cakeStyles.map((style) => (
              <article key={style.title}>
                <span>{style.number}</span>
                <h3>{style.title}</h3>
                <p>{style.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="custom-cake-planning" aria-label="Custom cake serving and quote planning">
          <div className="custom-cake-serving-panel">
            <p className="custom-cake-kicker">Plan The Servings</p>
            <h2>How much cake do you need?</h2>
            <p className="custom-cake-planning-intro">
              Start with the number of people you expect to serve. Final cake size depends on the design and how each cake
              is cut, so the bakery will recommend the right format after reviewing your request.
            </p>

            <div className="custom-cake-serving-grid">
              {servingRanges.map((item) => (
                <article key={item.range}>
                  <strong>{item.range}</strong>
                  <div>
                    <h3>{item.label}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="custom-cake-quote-panel">
            <p className="custom-cake-kicker">Your Custom Quote</p>
            <h2>What shapes the price?</h2>
            <p>
              Custom cake pricing is based on the complete request rather than one flat price. These are the details that
              help us prepare an accurate quote:
            </p>
            <ul>
              {quoteFactors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
            <a href="#custom-cake-request-form">Request a Cake Quote</a>
          </aside>
        </section>

        <div className="custom-cake-request-layout">
          <aside className="custom-cake-notes" aria-label="Custom cake notes">
            <p className="custom-cake-kicker">Before You Submit</p>
            <h3>Helpful details make better cakes.</h3>
            <div>
              {cakeNotes.map((note) => (
                <p key={note.text}>
                  <FontAwesomeIcon icon={note.icon} />
                  <span>{note.text}</span>
                </p>
              ))}
            </div>
            <div className="custom-cake-date-card">
              <FontAwesomeIcon icon={faCalendarCheck} />
              <span>Earliest available request date</span>
              <strong>{minLeadDate}</strong>
            </div>
          </aside>

          <div className="custom-cake-form-panel">
            <div className="custom-cake-form-heading">
              <p className="custom-cake-kicker">Request Form</p>
              <h3>Tell us about your cake.</h3>
              <p>We will review your request and contact you soon to confirm details.</p>
            </div>

            <form
              id="custom-cake-request-form"
              className="custom-cake-form"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              noValidate
            >
              <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="custom-cake-honeypot" aria-hidden="true" />

              <div className="custom-cake-grid">
                <label>
                  Full Name
                  <input type="text" name="name" required placeholder="Your name" />
                </label>

                <label>
                  Email
                  <input type="email" name="email" required placeholder="you@email.com" />
                </label>

                <label>
                  Phone
                  <input type="tel" name="phone" required placeholder="(276) 555-1234" />
                </label>

                <label>
                  Event Date
                  <input type="date" name="eventDate" required min={minLeadDate} />
                  <span className="custom-cake-inline-help">
                    Custom cakes must be ordered at least 14 days ahead. November 25–30, 2026 is unavailable.
                  </span>
                </label>

                <label>
                  Servings Needed
                  <select name="servings" required defaultValue="">
                    <option value="" disabled>
                      Select serving size
                    </option>
                    <option value="10-15">10-15 servings</option>
                    <option value="16-25">16-25 servings</option>
                    <option value="26-40">26-40 servings</option>
                    <option value="41-60">41-60 servings</option>
                    <option value="60+">60+ servings</option>
                  </select>
                </label>

                <label>
                  Budget Range
                  <select name="budget" defaultValue="">
                    <option value="" disabled>
                      Budget range (optional)
                    </option>
                    <option value="under-75">Under $75</option>
                    <option value="75-125">$75 - $125</option>
                    <option value="126-200">$126 - $200</option>
                    <option value="200+">$200+</option>
                  </select>
                </label>

                <label>
                  Flavor Notes
                  <input type="text" name="flavors" placeholder="Vanilla cake, strawberry filling, buttercream" />
                </label>

                <label>
                  Order Type
                  <input type="text" value="Pickup only" readOnly aria-readonly="true" />
                </label>
              </div>

              <input type="hidden" name="fulfillment" value="pickup" />

              <label>
                Theme / Design Ideas
                <textarea
                  name="designDetails"
                  required
                  rows="5"
                  placeholder="Describe colors, theme, style, wording on cake, and any must-have details."
                />
              </label>

              <span id="cake-images-label">Inspiration Images</span>
              <div className="custom-cake-upload-control">
                <input
                  id="cake-inspiration-images"
                  className="custom-cake-file-input"
                  type="file"
                  name="inspirationImages"
                  accept="image/*"
                  multiple
                  aria-labelledby="cake-images-label"
                  onChange={handleFileChange}
                />
                <label htmlFor="cake-inspiration-images" className="custom-cake-upload-button">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} image${selectedFiles.length > 1 ? 's' : ''} selected`
                    : 'Upload Images'}
                </label>
                <span className="custom-cake-upload-help">PNG, JPG, or HEIC. Add a few photos to show your style.</span>
              </div>

              {selectedFiles.length > 0 && (
                <p className="custom-cake-files" aria-live="polite">
                  Selected: {selectedFiles.join(', ')}
                </p>
              )}

              {status.message && (
                <p className={`custom-cake-status ${status.type === 'success' ? 'success' : 'error'}`} role="status" aria-live="polite">
                  {status.message}
                </p>
              )}

              <button type="submit" className="custom-cake-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending Request...' : 'Send Cake Request'}
              </button>
            </form>
          </div>
        </div>

        <section className="custom-cake-faq" aria-labelledby="custom-cake-faq-heading">
          <div>
            <p className="custom-cake-kicker">Custom Cake FAQ</p>
            <h2 id="custom-cake-faq-heading">Before you send your request</h2>
          </div>
          <div className="custom-cake-faq-list">
            {cakeFaqs.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default CustomCakeForm;
