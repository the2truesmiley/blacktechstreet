import { describe, expect, it } from 'vitest';
import { aspireNearbyCities, decemberVenue, nearbyCityDirections } from '@/data/aspireNearbyCities';
import { aspireEvents2026 } from '@/data/aspireEvents';

describe('Nearby-city December workshop pages', () => {
  it.each(aspireNearbyCities)('keeps the actual Tulsa venue for $name visitors', city => {
    const directions = new URL(nearbyCityDirections(city.name));
    expect(decemberVenue.name).toBe('Langston Tulsa');
    expect(directions.searchParams.get('destination')).toBe('914 N Greenwood Ave, Tulsa, OK 74106');
    expect(directions.searchParams.get('origin')).toBe(`${city.name}, OK`);
  });
  it('uses the December 5 event and its own registration form', () => {
    const event = aspireEvents2026.find(item => item.id === 'december-2026');
    expect(event?.date.getFullYear()).toBe(2026);
    expect(event?.date.getMonth()).toBe(11);
    expect(event?.date.getDate()).toBe(5);
    expect(event?.directRegistrationUrl).toBe('https://tally.so/r/Zj6dde');
  });
});