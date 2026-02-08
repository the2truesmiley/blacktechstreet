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

export const galleryPhotos: GalleryPhoto[] = [
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
