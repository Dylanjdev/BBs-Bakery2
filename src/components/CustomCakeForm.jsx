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
    text: 'Custom cakes are pickup only from BB\'s Bakery & Cafe on Main Street.',
  },
];

const cakeNotes = [
  { icon: faClock, text: 'Please request custom cakes at least 14 days ahead.' },
  { icon: faCamera, text: 'Upload a few photos so we can understand your style.' },
  { icon: faPhone, text: 'Need help before submitting? Call (276) 537-0189.' },
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
            <h2 id="custom-cakes-heading">Let BB's Bakery & Cafe make the cake everyone talks about.</h2>
            <p>
              Birthdays, showers, office celebrations, themed cakes, and sweet little surprises all start here.
              Tell us what you are dreaming up and we will follow up to confirm availability, pricing, and pickup timing.
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
                src="/assets/images/dotcake.webp"
                alt="Viral dot cake from BB's Bakery & Cafe"
                loading="eager"
                decoding="async"
              />
              <figcaption>Viral dot cakes and celebration sweets</figcaption>
            </figure>
            <figure className="custom-cake-small-photo">
              <img
                src="/assets/images/cupcakes.webp"
                alt="Fresh cupcakes from BB's Bakery & Cafe"
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
                  <span className="custom-cake-inline-help">Custom cakes must be ordered at least 14 days ahead.</span>
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
      </div>
    </section>
  );
}

export default CustomCakeForm;
