export const aspireNearbyCities = [
  { slug: 'broken-arrow', name: 'Broken Arrow' },
  { slug: 'owasso', name: 'Owasso' },
  { slug: 'jenks', name: 'Jenks' },
  { slug: 'bixby', name: 'Bixby' },
  { slug: 'sand-springs', name: 'Sand Springs' },
];

export const decemberVenue = {
  name: 'Langston Tulsa',
  address: '914 N Greenwood Ave, Tulsa, OK 74106',
};

export const nearbyCityPath = (slug: string) => `/aspire/events/december-2026/for/${slug}`;
export const nearbyCityTitle = (name: string) => `Free AI Workshop for ${name} Residents | December 5 | Black Tech Street`;
export const nearbyCityDescription = (name: string) => `Coming from ${name}? Join the free ASPIRE AI Workshop on December 5, 2026 at Langston Tulsa in Greenwood. Hands-on AI training, childcare, and laptops provided.`;
export const nearbyCityDirections = (name: string) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${name}, OK`)}&destination=${encodeURIComponent(decemberVenue.address)}`;