// Gallery data structure with tags for filtering
export interface GalleryPhoto {
  id: string;
  title: string;
  date: string;
  location: string;
  tags: string[];
  image: string;
}

// Import all gallery images
import aspireCertificateCeremony from '@/assets/gallery/aspire-certificate-ceremony.jpg';
import eventEntrance from '@/assets/gallery/event-entrance.png';
import communityGathering from '@/assets/gallery/community-gathering.jpg';
import tyranceSpeaking from '@/assets/gallery/tyrance-speaking.jpg';
import aspireWorkshop from '@/assets/gallery/aspire-workshop.jpg';
import dec2025TyrancePresenting from '@/assets/gallery/dec-2025-tyrance-presenting.jpg';
import dec2025AiWorkshopFullRoom from '@/assets/gallery/dec-2025-ai-workshop-full-room.jpg';
import dec2025ParticipantsLearning from '@/assets/gallery/dec-2025-participants-learning.jpg';
import sep2025Presenting from '@/assets/gallery/sep-2025-aspire-presenting.jpg';
import sep2025ParticipantAttentive from '@/assets/gallery/sep-2025-participant-attentive.jpg';
import sep2025TableDiscussion from '@/assets/gallery/sep-2025-table-discussion.jpg';
import sep2025GroupLaptops from '@/assets/gallery/sep-2025-group-laptops.jpg';
import sep2025ParticipantSpeaking from '@/assets/gallery/sep-2025-participant-speaking.jpg';
import sep2025BtsHelping from '@/assets/gallery/sep-2025-bts-helping.jpg';
import sep2025AiExercise from '@/assets/gallery/sep-2025-ai-exercise.jpg';
import sep2025FullRoom from '@/assets/gallery/sep-2025-full-room.jpg';
import sep2025WomenCollaborating from '@/assets/gallery/sep-2025-women-collaborating.jpg';
import sep2025TrioLaptop from '@/assets/gallery/sep-2025-trio-laptop.jpg';
import jun2025AttendeeArriving from '@/assets/gallery/jun-2025-attendee-arriving.jpg';
import jun2025CheckinSigning from '@/assets/gallery/jun-2025-checkin-signing.jpg';
import jun2025StaffAssisting from '@/assets/gallery/jun-2025-staff-assisting.jpg';
import jun2025StaffGreeting from '@/assets/gallery/jun-2025-staff-greeting.jpg';
import jun2025BtsRegistrationAssisting from '@/assets/gallery/jun-2025-bts-registration-assisting.jpg';
import jun2025StaffHandingLaptop from '@/assets/gallery/jun-2025-staff-handing-laptop.jpg';
import jun2025CoachWhiteStickyNotes from '@/assets/gallery/jun-2025-coach-white-sticky-notes.jpg';
import jun2025SwagPrizesTable from '@/assets/gallery/jun-2025-swag-prizes-table.jpg';
import jun2025SwagBagCloseup from '@/assets/gallery/jun-2025-swag-bag-closeup.jpg';
import jun2025VolunteersRefreshments from '@/assets/gallery/jun-2025-volunteers-refreshments.jpg';
import jun2025AttendeesAuditorium from '@/assets/gallery/jun-2025-attendees-auditorium.jpg';

export const galleryPhotos: GalleryPhoto[] = [
  // June 2025 ASPIRE Day 1
  {
    id: 'jun-2025-attendee-arriving',
    title: 'Attendee Arriving at ASPIRE',
    date: 'June 2025',
    location: 'Greenwood, Tulsa',
    tags: ['ASPIRE', 'Events', 'Community', 'June 2025'],
    image: jun2025AttendeeArriving,
  },
  {
    id: 'jun-2025-checkin-signing',
    title: 'Attendees Signing In at Check-In',
    date: 'June 2025',
    location: 'Greenwood, Tulsa',
    tags: ['ASPIRE', 'Events', 'Staff', 'June 2025'],
    image: jun2025CheckinSigning,
  },
  {
    id: 'jun-2025-staff-assisting',
    title: 'Staff Assisting Attendee at Check-In',
    date: 'June 2025',
    location: 'Greenwood, Tulsa',
    tags: ['ASPIRE', 'Events', 'Staff', 'June 2025'],
    image: jun2025StaffAssisting,
  },
  {
    id: 'jun-2025-staff-greeting',
    title: 'Registration Staff Greeting Attendees',
    date: 'June 2025',
    location: 'Greenwood, Tulsa',
    tags: ['ASPIRE', 'Events', 'Staff', 'Community', 'June 2025'],
    image: jun2025StaffGreeting,
  },
  {
    id: 'jun-2025-bts-registration-assisting',
    title: 'BTS Staff Assisting Attendee at Registration',
    date: 'June 2025',
    location: 'Greenwood, Tulsa',
    tags: ['ASPIRE', 'Events', 'Staff', 'June 2025'],
    image: jun2025BtsRegistrationAssisting,
  },
  {
    id: 'jun-2025-staff-handing-laptop',
    title: 'Staff Handing Laptop to Attendee at Check-In',
    date: 'June 2025',
    location: 'Greenwood, Tulsa',
    tags: ['ASPIRE', 'Events', 'Staff', 'June 2025'],
    image: jun2025StaffHandingLaptop,
  },
  {
    id: 'jun-2025-coach-white-sticky-notes',
    title: 'Coach White Posting Sticky Notes',
    date: 'June 2025',
    location: 'Greenwood, Tulsa',
    tags: ['ASPIRE', 'Events', 'Workshop', 'Leadership', 'June 2025'],
    image: jun2025CoachWhiteStickyNotes,
  },
  {
    id: 'jun-2025-swag-prizes-table',
    title: 'Emerging Technologies Summit Swag & Prizes',
    date: 'June 2025',
    location: 'Greenwood, Tulsa',
    tags: ['ASPIRE', 'Events', 'Community', 'June 2025'],
    image: jun2025SwagPrizesTable,
  },
  {
    id: 'jun-2025-swag-bag-closeup',
    title: 'Emerging Technologies Summit Swag Bag',
    date: 'June 2025',
    location: 'Greenwood, Tulsa',
    tags: ['ASPIRE', 'Events', 'Community', 'June 2025'],
    image: jun2025SwagBagCloseup,
  },
  {
    id: 'jun-2025-volunteers-refreshments',
    title: 'Volunteers Setting Up Refreshments',
    date: 'June 2025',
    location: 'Greenwood, Tulsa',
    tags: ['ASPIRE', 'Events', 'Staff', 'Community', 'June 2025'],
    image: jun2025VolunteersRefreshments,
  },
  {
    id: 'jun-2025-attendees-auditorium',
    title: 'Attendees Seated in Auditorium',
    date: 'June 2025',
    location: 'Greenwood, Tulsa',
    tags: ['ASPIRE', 'Events', 'Community', 'Learning', 'June 2025'],
    image: jun2025AttendeesAuditorium,
  },
  // December 6th, 2025 ASPIRE Workshop
  {
    id: 'dec-2025-tyrance-presenting',
    title: 'Tyrance Presenting at ASPIRE',
    date: 'December 6, 2025',
    location: 'Langston University',
    tags: ['ASPIRE', 'Workshop', 'Leadership', 'December 2025'],
    image: dec2025TyrancePresenting,
  },
  {
    id: 'dec-2025-ai-workshop-full-room',
    title: 'AI Workshop - Full Room',
    date: 'December 6, 2025',
    location: 'Langston University',
    tags: ['ASPIRE', 'Workshop', 'AI', 'Community', 'December 2025'],
    image: dec2025AiWorkshopFullRoom,
  },
  {
    id: 'dec-2025-participants-learning',
    title: 'Participants Learning AI',
    date: 'December 6, 2025',
    location: 'Langston University',
    tags: ['ASPIRE', 'Workshop', 'Learning', 'December 2025'],
    image: dec2025ParticipantsLearning,
  },
  // September 27th, 2025 ASPIRE Workshop
  {
    id: 'sep-2025-aspire-presenting',
    title: 'ASPIRE GenAI Fluency & Responsibility Lab',
    date: 'September 27, 2025',
    location: 'Greenwood Cultural Center, Tulsa',
    tags: ['ASPIRE', 'Workshop', 'Leadership', 'September 2025'],
    image: sep2025Presenting,
  },
  {
    id: 'sep-2025-participant-attentive',
    title: 'Participant Engaged in Learning',
    date: 'September 27, 2025',
    location: 'Greenwood Cultural Center, Tulsa',
    tags: ['ASPIRE', 'Workshop', 'Community', 'September 2025'],
    image: sep2025ParticipantAttentive,
  },
  {
    id: 'sep-2025-table-discussion',
    title: 'Table Discussion at ASPIRE',
    date: 'September 27, 2025',
    location: 'Greenwood Cultural Center, Tulsa',
    tags: ['ASPIRE', 'Workshop', 'Networking', 'September 2025'],
    image: sep2025TableDiscussion,
  },
  {
    id: 'sep-2025-group-laptops',
    title: 'Group Working on AI Exercises',
    date: 'September 27, 2025',
    location: 'Greenwood Cultural Center, Tulsa',
    tags: ['ASPIRE', 'Workshop', 'Learning', 'AI', 'September 2025'],
    image: sep2025GroupLaptops,
  },
  {
    id: 'sep-2025-participant-speaking',
    title: 'Participant Asking a Question',
    date: 'September 27, 2025',
    location: 'Greenwood Cultural Center, Tulsa',
    tags: ['ASPIRE', 'Workshop', 'Community', 'September 2025'],
    image: sep2025ParticipantSpeaking,
  },
  {
    id: 'sep-2025-bts-helping',
    title: 'Black Tech Street Staff Assisting Participant',
    date: 'September 27, 2025',
    location: 'Greenwood Cultural Center, Tulsa',
    tags: ['ASPIRE', 'Workshop', 'Learning', 'September 2025'],
    image: sep2025BtsHelping,
  },
  {
    id: 'sep-2025-ai-exercise',
    title: 'Participant Working on AI Exercise',
    date: 'September 27, 2025',
    location: 'Greenwood Cultural Center, Tulsa',
    tags: ['ASPIRE', 'Workshop', 'AI', 'Learning', 'September 2025'],
    image: sep2025AiExercise,
  },
  {
    id: 'sep-2025-full-room',
    title: 'Full Room at ASPIRE Workshop',
    date: 'September 27, 2025',
    location: 'Greenwood Cultural Center, Tulsa',
    tags: ['ASPIRE', 'Workshop', 'Community', 'September 2025'],
    image: sep2025FullRoom,
  },
  {
    id: 'sep-2025-women-collaborating',
    title: 'Women Collaborating at ASPIRE',
    date: 'September 27, 2025',
    location: 'Greenwood Cultural Center, Tulsa',
    tags: ['ASPIRE', 'Workshop', 'Networking', 'Community', 'September 2025'],
    image: sep2025WomenCollaborating,
  },
  {
    id: 'sep-2025-trio-laptop',
    title: 'Trio Learning Together',
    date: 'September 27, 2025',
    location: 'Greenwood Cultural Center, Tulsa',
    tags: ['ASPIRE', 'Workshop', 'Learning', 'September 2025'],
    image: sep2025TrioLaptop,
  },
  // Previous photos
  {
    id: 'aspire-certificate-ceremony',
    title: 'ASPIRE Certificate Ceremony',
    date: '2024',
    location: 'Langston University',
    tags: ['ASPIRE', 'Ceremony', 'Achievement'],
    image: aspireCertificateCeremony,
  },
  {
    id: 'event-entrance',
    title: 'Event Arrival',
    date: '2024',
    location: 'Greenwood, Tulsa',
    tags: ['Events', 'Community'],
    image: eventEntrance,
  },
  {
    id: 'community-gathering',
    title: 'Community Gathering',
    date: '2024',
    location: 'Greenwood, Tulsa',
    tags: ['Community', 'Networking'],
    image: communityGathering,
  },
  {
    id: 'tyrance-speaking',
    title: 'Leadership Keynote',
    date: '2024',
    location: 'Greenwood, Tulsa',
    tags: ['Events', 'Leadership', 'Speaking'],
    image: tyranceSpeaking,
  },
  {
    id: 'aspire-workshop',
    title: 'ASPIRE Workshop Session',
    date: '2024',
    location: 'Langston University',
    tags: ['ASPIRE', 'Workshop', 'Learning'],
    image: aspireWorkshop,
  },
];

// Get all unique tags from the gallery
export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  galleryPhotos.forEach(photo => {
    photo.tags.forEach(tag => tagSet.add(tag));
  });
  return ['All', ...Array.from(tagSet).sort()];
};

// Filter photos by tag
export const getPhotosByTag = (tag: string): GalleryPhoto[] => {
  if (tag === 'All') return galleryPhotos;
  return galleryPhotos.filter(photo => photo.tags.includes(tag));
};

// Get photos by date
export const getPhotosByDate = (date: string): GalleryPhoto[] => {
  return galleryPhotos.filter(photo => photo.date === date);
};
