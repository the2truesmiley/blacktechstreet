import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import { renderRouteHtml } from '../../scripts/renderRouteHtml';
import { decemberWorkshopDetails, decemberWorkshopPath, decemberWorkshopSchema } from '@/data/decemberWorkshopSeo';

describe('December workshop crawler-visible event rules', () => {
  const html = renderRouteHtml(fs.readFileSync('index.html', 'utf8'), decemberWorkshopPath);
  const document = new DOMParser().parseFromString(html, 'text/html');
  const schema = JSON.parse(document.querySelector('#event-jsonld')?.textContent ?? '{}');

  it('publishes December 5 from 10 AM to 6 PM Central with explicit offsets', () => {
    expect(schema.startDate).toBe('2026-12-05T10:00:00-06:00');
    expect(schema.endDate).toBe('2026-12-05T18:00:00-06:00');
  });
  it('publishes the actual Langston Tulsa venue, not headquarters', () => {
    expect(schema.location.name).toBe('Langston Tulsa');
    expect(schema.location.address).toEqual({
      '@type': 'PostalAddress', streetAddress: '914 N Greenwood Ave',
      addressLocality: 'Tulsa', addressRegion: 'OK', postalCode: '74106', addressCountry: 'US',
    });
  });
  it('publishes free admission in USD', () => {
    expect(schema.isAccessibleForFree).toBe(true);
    expect(schema.offers.price).toBe(0);
    expect(schema.offers.priceCurrency).toBe('USD');
  });
  it('identifies this event page and its December registration form', () => {
    expect(schema.url).toBe('https://blacktechstreet.ai/aspire/events/december-2026');
    expect(schema.offers.url).toBe('https://tally.so/r/Zj6dde');
    expect(decemberWorkshopDetails.registrationUrl).toBe(schema.offers.url);
  });
  it('uses identical event facts before and after JavaScript starts', () => {
    expect(schema).toEqual(decemberWorkshopSchema);
  });
});