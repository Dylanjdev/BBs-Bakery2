import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const siteUrl = 'https://bbs-bakery.com';
const routes = ['about', 'menu', 'reviews', 'hours', 'ordering-guide', 'custom-cakes', 'catering', 'faq', 'contact'];

const routeMetadata = {
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
    }

    await mkdir(routeDir, { recursive: true });
    await writeFile(join(routeDir, 'index.html'), routeHtml);
  })
);
