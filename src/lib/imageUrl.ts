/**
 * Rewrites a public Supabase storage URL to the on-the-fly image transform
 * endpoint so grid tiles load small thumbnails instead of full-size photos.
 */
export function thumbUrl(url: string, width = 600, quality = 70): string {
  if (!url || !url.includes('/storage/v1/object/public/')) return url;
  const transformed = url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
  const separator = transformed.includes('?') ? '&' : '?';
  return `${transformed}${separator}width=${width}&quality=${quality}&resize=cover`;
}
