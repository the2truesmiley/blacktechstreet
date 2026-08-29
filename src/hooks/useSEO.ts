import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  canonical?: string;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.querySelector(`meta[${selector}]`);
  if (el) el.setAttribute(attr, value);
}

function setOrCreateMeta(key: 'property' | 'name', id: string, content: string) {
  let el = document.querySelector(`meta[${key}="${id}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(key, id);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSEO({ title, description, ogImage, ogType = 'website', ogUrl, canonical }: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    setMeta('name="description"', 'content', description);

    // Open Graph (updates static index.html tags in place where they exist)
    setMeta('property="og:title"', 'content', title);
    setMeta('property="og:description"', 'content', description);
    setMeta('property="og:type"', 'content', ogType);
    if (ogImage) setMeta('property="og:image"', 'content', ogImage);
    if (ogUrl) setOrCreateMeta('property', 'og:url', ogUrl);

    // Twitter card (twitter:title / twitter:description fall back to og:*,
    // but set them explicitly for crawlers that prefer the twitter namespace)
    setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('name', 'twitter:title', title);
    setOrCreateMeta('name', 'twitter:description', description);
    if (ogImage) setMeta('name="twitter:image"', 'content', ogImage);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }, [title, description, ogImage, ogType, ogUrl, canonical]);
}
