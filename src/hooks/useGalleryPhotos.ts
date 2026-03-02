import { useQuery } from '@tanstack/react-query';
import { galleryPhotos } from '@/data/galleryData';

export interface GalleryPhoto {
  id: string;
  title: string;
  event_date: string;
  location: string;
  tags: string[];
  image_url: string;
  created_at: string;
}

export const useGalleryPhotos = () => {
  return useQuery({
    queryKey: ['gallery-photos'],
    queryFn: async () => {
      const photos: GalleryPhoto[] = galleryPhotos.map((p) => ({
        id: p.id,
        title: p.title,
        event_date: p.date,
        location: p.location,
        tags: p.tags,
        image_url: p.image,
        created_at: p.date,
      }));
      return photos.sort(() => Math.random() - 0.5);
    },
  });
};

export const useGalleryTags = (photos: GalleryPhoto[] | undefined) => {
  if (!photos) return ['All'];
  const tagSet = new Set<string>();
  photos.forEach((photo) => {
    photo.tags.forEach((tag) => tagSet.add(tag));
  });
  return ['All', ...Array.from(tagSet).sort()];
};

export const filterPhotosByTag = (photos: GalleryPhoto[] | undefined, tag: string) => {
  if (!photos) return [];
  if (tag === 'All') return photos;
  return photos.filter((photo) => photo.tags.includes(tag));
};
