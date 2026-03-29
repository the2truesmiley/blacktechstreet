import { useEffect } from 'react';

interface EventJsonLdProps {
  name: string;
  description: string;
  startDate: string; // ISO 8601
  endDate: string;   // ISO 8601
  location: {
    name: string;
    address: string;
  };
  url: string;
  imageUrl?: string;
  organizer?: string;
}

export function EventJsonLd({
  name,
  description,
  startDate,
  endDate,
  location,
  url,
  imageUrl,
  organizer = 'Black Tech Street',
}: EventJsonLdProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'event-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationEvent',
      name,
      description,
      startDate,
      endDate,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      isAccessibleForFree: true,
      location: {
        '@type': 'Place',
        name: location.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '914 N Greenwood Ave',
          addressLocality: 'Tulsa',
          addressRegion: 'OK',
          postalCode: '74106',
          addressCountry: 'US',
        },
      },
      organizer: {
        '@type': 'Organization',
        name: organizer,
        url: 'https://blacktechstreet.ai',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url,
      },
      ...(imageUrl && { image: imageUrl }),
      url,
    });

    // Remove existing before appending
    const existing = document.getElementById('event-jsonld');
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [name, description, startDate, endDate, location, url, imageUrl, organizer]);

  return null;
}
