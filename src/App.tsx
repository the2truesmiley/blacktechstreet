import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Eagerly load the homepage for instant first paint
import Index from "./pages/Index";

// Lazy load all other pages
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Aspire = lazy(() => import("./pages/Aspire"));
const AspireEvents = lazy(() => import("./pages/AspireEvents"));
const AspireEventJune2026 = lazy(() => import("./pages/AspireEventJune2026"));
const AspireEventSeptember2026 = lazy(() => import("./pages/AspireEventSeptember2026"));
const AspireEventDecember2026 = lazy(() => import("./pages/AspireEventDecember2026"));
const AspireEventApril2026 = lazy(() => import("./pages/AspireEventApril2026"));
const FreeAiWorkshop = lazy(() => import("./pages/FreeAiWorkshop"));
const FreeAiTrainingFaq = lazy(() => import("./pages/FreeAiTrainingFaq"));
const Partners = lazy(() => import("./pages/Partners"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const News = lazy(() => import("./pages/News"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'hsl(160, 20%, 6%)' }}>
    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/aspire" element={<Aspire />} />
            <Route path="/aspire/events" element={<AspireEvents />} />
            <Route path="/aspire/events/june-2026" element={<AspireEventJune2026 />} />
            <Route path="/aspire/events/september-2026" element={<AspireEventSeptember2026 />} />
            <Route path="/aspire/events/december-2026" element={<AspireEventDecember2026 />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/flyer1" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
