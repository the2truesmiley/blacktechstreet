import { describe, it, expect } from 'vitest';
import { getPaper } from '@/data/thoughtLeadership';
import { apaAuthor, apaCitation, authorInitials } from './citation';

describe('Thought Leadership citation', () => {
  it('formats the founder in APA style with his suffix', () => {
    expect(apaAuthor('Tyrance Billingsley II')).toBe('Billingsley, T., II.');
  });

  it('builds the full Value-Native AI citation with the short SSRN link', () => {
    expect(apaCitation(getPaper('value-native-ai')!)).toBe(
      'Billingsley, T., II. (2026). Value-Native AI: Infrastructure for Creating, Identifying, and Capturing Value in the Age of AI. SSRN. https://ssrn.com/abstract=7621738'
    );
  });

  it('shows TB on the author badge', () => {
    expect(authorInitials('Tyrance Billingsley II')).toBe('TB');
  });
});
