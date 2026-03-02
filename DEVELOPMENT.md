# BB's Bakery & Cafe Development Guide

## Project Structure

```
src/
  ├── components/       # React components
  ├── hooks/           # Custom React hooks
  ├── assets/          # Images and static files
  ├── App.jsx          # Main app component
  ├── main.jsx         # React DOM root
  └── *.css            # Component and global styles
public/
  ├── assets/          # Favicons and images
  └── site.webmanifest # PWA manifest
```

## Best Practices

### Performance
- ✅ Lazy loading for below-the-fold components
- ✅ Code splitting (vendor, FontAwesome chunks)
- ✅ Image optimization (WebP format, async decoding)
- ✅ CSS minification in production
- ✅ JavaScript console.log removal in production

### Accessibility
- ✅ Skip-to-content link
- ✅ ARIA labels and roles
- ✅ Focus indicators on interactive elements
- ✅ Reduced motion support
- ✅ Semantic HTML structure

### SEO
- ✅ Meta tags (description, keywords, OG)
- ✅ robots.txt and sitemap ready
- ✅ Schema.org structured data (Bakery)
- ✅ Semantic HTML headings
- ✅ Alt text on all images

### Security
- ✅ rel="noopener noreferrer" on external links
- ✅ XSS prevention via React's built-in escaping
- ✅ Error boundary for graceful error handling

### Code Quality
- ✅ React.memo for Header to prevent re-renders
- ✅ useCallback for event handlers (where needed)
- ✅ Custom hooks for reusable logic
- ✅ Environment variables setup
- ✅ Proper error handling

## Development Workflow

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

### Environment Variables
Copy `.env.example` to `.env.local` and fill in your values.

### Export Square Variation IDs
Run this when you need a catalog mapping for checkout:

```bash
npm run square:export-variation-ids
```

Required env vars:
- `SQUARE_ACCESS_TOKEN` (Sandbox or Production token)
- `SQUARE_ENVIRONMENT` (`sandbox` or `production`)

Output file:
- `square-variation-ids.csv` (includes item name, variation name, and variation ID)

Build menu mapping file from the CSV:

```bash
npm run square:build-variation-map
```

This updates:
- `src/data/squareVariationMap.js`

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 5+

## Future Improvements

1. **TypeScript** - Add type safety
2. **Testing** - Jest + React Testing Library
3. **i18n** - Multi-language support
4. **Analytics** - Google Analytics integration
5. **CMS** - Headless CMS for menu/content
6. **Forms** - Contact form backend integration
