const LocalDessertGuide = () => (
  <article
    className="local-dessert-guide"
    aria-labelledby="local-dessert-guide-heading"
  >
    <div className="local-dessert-guide__intro">
      <p className="local-dessert-guide__eyebrow">A sweet stop in Pennington Gap</p>
      <h2 id="local-dessert-guide-heading">
        The Ultimate Lee County Dessert &amp; Road Trip Guide: Best Bakery Stops in Southwest Virginia
      </h2>
      <p>
        A drive through Lee County is even better with a fresh pastry, locally made dessert,
        or coffee in hand. BB&apos;s Bakery &amp; Cafe in Pennington Gap is an easy place to pause,
        recharge, and enjoy a taste of Southwest Virginia before the next leg of your trip.
      </p>
    </div>

    <div className="local-dessert-guide__grid">
      <section>
        <h3>Choose a road-trip treat</h3>
        <p>
          Cookies, loaded brownies, blueberry glazed donuts, cupcakes, and other rotating
          bakery favorites make a welcome addition to a scenic drive. Browse the{' '}
          <a href="/menu">current bakery and cafe menu</a> before you arrive, since the fresh
          selection can change throughout the week.
        </p>
      </section>

      <section>
        <h3>Make it a breakfast or lunch stop</h3>
        <p>
          Traveling hungry? Pair something sweet with coffee, breakfast, or lunch and take a
          proper break in Pennington Gap. Check the bakery&apos;s <a href="/hours">current hours</a>{' '}
          while planning your Lee County route.
        </p>
      </section>

      <section>
        <h3>Bring Southwest Virginia flavor home</h3>
        <p>
          Pick up a box to share at your destination, or plan ahead for a birthday and other
          celebration. For a personalized centerpiece, review the{' '}
          <a href="/custom-cakes">custom cake options</a> before your visit.
        </p>
      </section>
    </div>

    <aside className="local-dessert-guide__stop">
      <strong>Plan your bakery stop:</strong>
      <span> BB&apos;s Bakery &amp; Cafe, 103 Main St, Pennington Gap, Virginia.</span>
    </aside>

    <style>{`
      .local-dessert-guide {
        width: min(1180px, calc(100% - 2rem));
        margin: 0 auto clamp(2.5rem, 7vw, 5rem);
        padding: clamp(1.5rem, 5vw, 3.5rem);
        border: 1px solid rgba(214, 90, 140, 0.18);
        border-radius: 24px;
        background: linear-gradient(145deg, #fffafc 0%, #fff 52%, #f5faf5 100%);
        box-shadow: 0 18px 45px rgba(42, 42, 42, 0.08);
      }

      .local-dessert-guide__intro {
        max-width: 900px;
      }

      .local-dessert-guide__eyebrow {
        margin: 0 0 0.65rem;
        color: #b84472;
        font-family: 'Quicksand', sans-serif;
        font-size: 0.88rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .local-dessert-guide h2,
      .local-dessert-guide h3 {
        color: #1a1a1a;
        font-family: 'Playfair Display', serif;
      }

      .local-dessert-guide h2 {
        margin: 0 0 1rem;
        font-size: clamp(1.85rem, 5vw, 3rem);
        line-height: 1.12;
        letter-spacing: -0.035em;
      }

      .local-dessert-guide__intro > p:last-child,
      .local-dessert-guide__grid p {
        color: #5f5f5f;
        font-family: 'Quicksand', sans-serif;
        line-height: 1.75;
      }

      .local-dessert-guide__intro > p:last-child {
        margin: 0;
        max-width: 820px;
        font-size: clamp(1rem, 2vw, 1.1rem);
      }

      .local-dessert-guide__grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        margin-top: clamp(1.5rem, 4vw, 2.5rem);
      }

      .local-dessert-guide__grid section {
        padding: 1.25rem;
        border-top: 3px solid rgba(214, 90, 140, 0.55);
        border-radius: 0 0 14px 14px;
        background: rgba(255, 255, 255, 0.78);
      }

      .local-dessert-guide__grid h3 {
        margin: 0 0 0.55rem;
        font-size: 1.25rem;
      }

      .local-dessert-guide__grid p {
        margin: 0;
        font-size: 0.96rem;
      }

      .local-dessert-guide a {
        color: #a93665;
        font-weight: 800;
        text-underline-offset: 0.18em;
      }

      .local-dessert-guide a:hover,
      .local-dessert-guide a:focus-visible {
        color: #762044;
      }

      .local-dessert-guide__stop {
        margin-top: 1.25rem;
        padding: 1rem 1.15rem;
        border-radius: 12px;
        color: #3f5541;
        background: rgba(232, 240, 232, 0.72);
        font-family: 'Quicksand', sans-serif;
        line-height: 1.6;
      }

      @media (max-width: 820px) {
        .local-dessert-guide__grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 520px) {
        .local-dessert-guide {
          width: calc(100% - 1rem);
          border-radius: 18px;
        }
      }
    `}</style>
  </article>
);

export default LocalDessertGuide;
