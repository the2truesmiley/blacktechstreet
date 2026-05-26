import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download, X, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import logoCircuit from "@/assets/logo_b_circuit.png";
import { useSEO } from "@/hooks/useSEO";

const BUCKET = "hqopeningphotos";
const FOLDER = "";

interface Photo {
  name: string;
  url: string;
}

export default function HqGrandOpeningPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .list(FOLDER, { limit: 500, sortBy: { column: "name", order: "asc" } });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const files = (data ?? []).filter((f) =>
        /\.(jpe?g|png|webp|gif|heic)$/i.test(f.name)
      );

      const mapped = files.map((f) => {
        const { data: pub } = supabase.storage
          .from(BUCKET)
          .getPublicUrl(`${FOLDER}/${f.name}`);
        return { name: f.name, url: pub.publicUrl };
      });

      setPhotos(mapped);
      setLoading(false);
    })();
  }, []);

  const downloadOne = async (photo: Photo) => {
    try {
      const res = await fetch(photo.url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = photo.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Download failed");
    }
  };

  const sharePage = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Black Tech Street HQ Grand Opening",
          text: "Photos from the Black Tech Street HQ Grand Opening",
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  useSEO({
    title: "HQ Grand Opening Photos | Black Tech Street",
    description:
      "Thank you for joining us. Browse, download, and share photos from the Black Tech Street HQ Grand Opening.",
    canonical: "https://blacktechstreet.ai/hqgrandopeningphotos",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">

      <header className="border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back home
          </Link>
          <button
            onClick={sharePage}
            className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 transition"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <p className="text-primary text-xs font-medium tracking-[0.2em] uppercase mb-4">
          Thank You
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-6">
          HQ Grand Opening
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Thank you for being part of a historic moment on Black Wall Street.
          Browse, download, and share the memories from our HQ Grand Opening.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted/40 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center text-muted-foreground py-24">
            Photos are being uploaded. Check back shortly.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.name}
                className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer"
                onClick={() => setLightbox(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadOne(photo);
                  }}
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition"
                  aria-label="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
            onClick={(e) => {
              e.stopPropagation();
              downloadOne(lightbox);
            }}
          >
            <Download className="w-4 h-4" /> Download
          </button>
          <img
            src={lightbox.url}
            alt={lightbox.name}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
