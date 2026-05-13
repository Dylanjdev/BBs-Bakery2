import { useState } from 'react';
import '../custom-cake.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdabeylq';

const BLOCKED_DATES = [
  '2026-05-29', // fully booked
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
        <div className="custom-cake-intro">
          <p className="custom-cake-kicker">Dream It. Slice It. Celebrate It.</p>
          <h2 id="custom-cakes-heading">Custom Cake Order Form</h2>
          <p>
            Tell us what you are dreaming up and upload inspiration photos. We will follow up to lock in flavors,
            pricing, and pickup timing.
          </p>
        </div>

        <form className="custom-cake-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
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
                  Select budget range (optional)
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
    </section>
  );
}

export default CustomCakeForm;