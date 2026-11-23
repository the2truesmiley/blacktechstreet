import { aspireEvents2026 } from './aspireEvents';
import { decemberVenue } from './aspireNearbyCities';

export const decemberWorkshopPath = '/aspire/events/december-2026';
const url = `https://blacktechstreet.ai${decemberWorkshopPath}`;
const event = aspireEvents2026.find(item => item.id === 'december-2026');
if (!event) throw new Error('December ASPIRE event is missing');

export const decemberWorkshopSeo = {
  title: 'Free AI Workshop in Tulsa | December 5, 2026 | ASPIRE',
  description: 'Free, beginner-friendly ASPIRE AI Workshop on December 5 at Langston Tulsa. Hands-on training, free childcare and laptop checkout. Register today.',
  canonical: url,
  ogUrl: url,
};

export const decemberWorkshopDetails = {
  name: 'ASPIRE AI Workshop',
  startDate: '2026-12-05T10:00:00-06:00',
  endDate: '2026-12-05T18:00:00-06:00',
  dateLabel: 'Saturday, December 5, 2026',
  time: event.time,
  venue: decemberVenue,
  registrationUrl: event.directRegistrationUrl,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(decemberVenue.address)}`,
};

export const decemberWorkshopSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationEvent',
  name: decemberWorkshopDetails.name,
  description: decemberWorkshopSeo.description,
  startDate: decemberWorkshopDetails.startDate,
  endDate: decemberWorkshopDetails.endDate,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  isAccessibleForFree: true,
  location: {
    '@type': 'Place',
    name: decemberVenue.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '914 N Greenwood Ave',
      addressLocality: 'Tulsa',
      addressRegion: 'OK',
      postalCode: '74106',
      addressCountry: 'US',
    },
  },
  organizer: { '@type': 'Organization', name: 'Black Tech Street', url: 'https://blacktechstreet.ai' },
  offers: {
    '@type': 'Offer',
    price: 0,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: decemberWorkshopDetails.registrationUrl,
  },
  url,
};