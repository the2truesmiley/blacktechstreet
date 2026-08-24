import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { TopNavBar } from "@/components/timeline/TopNavBar";
import { Footer } from "@/components/timeline/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page not found | Black Tech Street";
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute("content", "noindex, follow");
    } else {
      const tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      tag.setAttribute("content", "noindex, follow");
      document.head.appendChild(tag);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopNavBar />
      <main className="flex-1 flex items-center justify-center px-5 pt-32 pb-20">
        <div className="max-w-xl text-center">
          <p className="text-sm font-medium tracking-widest text-primary mb-4">404</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
            We couldn't find that page
          </h1>
          <p className="text-muted-foreground mb-8">
            The link may be out of date. Here are the pages people usually want.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/">Go to homepage</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/aspire/events">ASPIRE workshops</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
