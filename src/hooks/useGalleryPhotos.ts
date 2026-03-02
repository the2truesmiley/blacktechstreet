import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      // Shuffle photos randomly
      const shuffled = (data as GalleryPhoto[]).sort(() => Math.random() - 0.5);
      return shuffled;
    },
  });
};

export const useGalleryTags = (photos: GalleryPhoto[] | undefined) => {
  if (!photos) return ['All'];
  
  const tagSet = new Set<string>();
  photos.forEach(photo => {
    photo.tags.forEach(tag => tagSet.add(tag));
  });
  return ['All', ...Array.from(tagSet).sort()];
};

export const filterPhotosByTag = (photos: GalleryPhoto[] | undefined, tag: string) => {
  if (!photos) return [];
  if (tag === 'All') return photos;
  return photos.filter(photo => photo.tags.includes(tag));
};
