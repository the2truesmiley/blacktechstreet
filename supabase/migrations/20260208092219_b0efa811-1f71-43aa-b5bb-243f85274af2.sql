-- Create gallery_photos table with tags support
CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  location TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (gallery is public)
CREATE POLICY "Gallery photos are publicly viewable" 
ON public.gallery_photos 
FOR SELECT 
USING (true);

-- Create storage bucket for gallery photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true);

-- Create policy for public read access to gallery bucket
CREATE POLICY "Gallery images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gallery');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_gallery_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gallery_photos_updated_at
BEFORE UPDATE ON public.gallery_photos
FOR EACH ROW
EXECUTE FUNCTION public.update_gallery_updated_at();