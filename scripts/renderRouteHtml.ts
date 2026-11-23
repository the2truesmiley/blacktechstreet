import { routeMeta, SITE } from './routeMeta';
import { decemberWorkshopDetails, decemberWorkshopPath, decemberWorkshopSchema, decemberWorkshopSeo } from '../src/data/decemberWorkshopSeo';

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Used for both published route files and the development preview. */
export function renderRouteHtml(base: string, route: string): string {
  const meta = routeMeta[route];
  if (!meta) return base;
  const url = SITE + route;
  let html = base.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  const setTag = (pattern: RegExp, tag: string) => {
    html = pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `${tag}\n</head>`);
  };
  for (const [attribute, key, value] of [
    ['name', 'description', meta.description],
    ['property', 'og:title', meta.title],
    ['property', 'og:description', meta.description],
    ['property', 'og:url', url],
    ['name', 'twitter:title', meta.title],
    ['name', 'twitter:description', meta.description],
  ]) {
    setTag(new RegExp(`<meta\\b(?=[^>]*\\b${attribute}="${key}")[^>]*>`, 'i'), `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
  }
  setTag(/<link\b(?=[^>]*\brel="canonical")[^>]*>/i, `<link rel="canonical" href="${escapeHtml(url)}" />`);

  if (route === decemberWorkshopPath) {
    const details = decemberWorkshopDetails;
    const json = JSON.stringify(decemberWorkshopSchema).replace(/</g, '\\u003c');
    setTag(/<script\b(?=[^>]*\bid="event-jsonld")[^>]*>[\s\S]*?<\/script>/i, `<script id="event-jsonld" type="application/ld+json">${json}</script>`);
    // React replaces this real, visible content when JavaScript starts. No cloaking
    // or hidden crawler-only copy: visitors without JS can read and register too.
    const content = `<main>
      <h1>${escapeHtml(details.name)}: Free AI Workshop in Tulsa</h1>
      <p>${escapeHtml(decemberWorkshopSeo.description)}</p>
      <p><time datetime="${details.startDate}">${escapeHtml(details.dateLabel)}</time>, ${escapeHtml(details.time)} Central Time.</p>
      <p><a href="${escapeHtml(details.directionsUrl)}">${escapeHtml(details.venue.name)}, ${escapeHtml(details.venue.address)}</a></p>
      <p>Free admission. Hands-on AI training and responsible innovation for work, business, and everyday life. Beginners welcome.</p>
      <p>Free on-site childcare and laptop checkout are available. Indicate your needs during registration.</p>
      <p>Organized by Black Tech Street.</p>
      <p><a href="${escapeHtml(details.registrationUrl)}">Register for the free ASPIRE AI Workshop</a></p>
      <p><a href="/aspire/parking">Parking details</a></p>
    </main>`;
    html = html.replace(/<div id="root"><\/div>/, `<div id="root">${content}</div>`);
  }
  return html;
}