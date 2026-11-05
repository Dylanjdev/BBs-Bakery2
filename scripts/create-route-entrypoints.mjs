import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const siteUrl = 'https://bbs-bakery.com';
const routes = ['about', 'menu', 'reviews', 'hours', 'ordering-guide', 'custom-cakes', 'catering', 'faq', 'contact', 'admin'];

const customCakeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${siteUrl}/custom-cakes#service`,
      name: 'Custom Cakes in Pennington Gap, Virginia',
      serviceType: 'Custom birthday and celebration cakes',
      url: `${siteUrl}/custom-cakes`,
      image: `${siteUrl}/assets/images/blackberry-pomegranate-tiered-cake.jpg`,
      provider: { '@id': `${siteUrl}/#bakery` },
      areaServed: [
        { '@type': 'City', name: 'Pennington Gap, Virginia' },
        { '@type': 'AdministrativeArea', name: 'Lee County, Virginia' },
        { '@type': 'Place', name: 'Southwest Virginia' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/custom-cakes#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How far ahead should I order a custom cake?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Please submit your request at least 14 days before your event. More notice is helpful for larger, tiered, or highly detailed designs.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where do I pick up my custom cake?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Custom cake pickup is at BB's Bakery & Cafe, 103 Main St in Pennington Gap, Virginia. The bakery will confirm the pickup time with your order.",
          },
        },
        {
          '@type': 'Question',
          name: 'Can I send inspiration photos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Use the request form to upload a few photos and describe the colors, piping, theme, or design details you like.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is submitting the form a confirmed order?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The bakery will follow up to confirm availability, final design, price, and pickup details before the order is booked.',
          },
        },
      ],
    },
  ],
};

const routeMetadata = {
  'custom-cakes': {
    title: "Custom Cakes in Pennington Gap, VA | BB's Bakery",
    description: "Request custom birthday cakes, tiered celebration cakes, cupcakes, and themed designs from BB's Bakery & Cafe in Pennington Gap, Virginia.",
    image: `${siteUrl}/assets/images/blackberry-pomegranate-tiered-cake.jpg`,
    imageAlt: "Custom tiered cake made by BB's Bakery & Cafe in Pennington Gap, Virginia",
    structuredData: customCakeStructuredData,
  },
  catering: {
    title: "Catering in Pennington Gap, VA | BB's Bakery & Cafe",
    description: "Plan fresh bakery, breakfast, lunch, office, party, and dessert catering from BB's Bakery & Cafe in Pennington Gap, VA. Request a custom quote.",
  },
};

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const distDir = 'dist';
const indexPath = join(distDir, 'index.html');
const indexHtml = await readFile(indexPath, 'utf8');

await Promise.all(
  routes.map(async (route) => {
    const routeDir = join(distDir, route);
    const routeUrl = `${siteUrl}/${route}`;
    const metadata = routeMetadata[route];
    let routeHtml = indexHtml
      .replace(
        /<meta property="og:url" content="[^"]*" \/>/,
        `<meta property="og:url" content="${routeUrl}" />`
      )
      .replace(
        /<link rel="canonical" href="[^"]*" \/>/,
        `<link rel="canonical" href="${routeUrl}" />`
      );

    if (metadata) {
      const title = escapeHtml(metadata.title);
      const description = escapeHtml(metadata.description);

      routeHtml = routeHtml
        .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
        .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
        .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
        .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`)
        .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`)
        .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`);

      if (metadata.image) {
        const imageAlt = escapeHtml(metadata.imageAlt || metadata.title);
        routeHtml = routeHtml
          .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${metadata.image}" />`)
          .replace(/<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${imageAlt}" />`)
          .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${metadata.image}" />`)
          .replace(/<meta name="twitter:image:alt" content="[^"]*" \/>/, `<meta name="twitter:image:alt" content="${imageAlt}" />`)
          .replace(
            /<link rel="preload" as="image" href="[^"]*" type="[^"]*" fetchpriority="high" \/>/,
            '<link rel="preload" as="image" href="/assets/images/blackberry-pomegranate-tiered-cake.jpg" type="image/jpeg" fetchpriority="high" />'
          );
      }

      if (metadata.structuredData) {
        routeHtml = routeHtml.replace(
          '</head>',
          `    <script id="route-structured-data" type="application/ld+json">${JSON.stringify(metadata.structuredData)}</script>\n  </head>`
        );
      }
    }

    await mkdir(routeDir, { recursive: true });
    await writeFile(join(routeDir, 'index.html'), routeHtml);
  })
);
