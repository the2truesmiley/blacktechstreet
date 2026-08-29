import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToHash } from "@/components/ScrollToHash";

// Eagerly load the homepage for instant first paint
import Index from "./pages/Index";

// Lazy load all other pages
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Aspire = lazy(() => import("./pages/Aspire"));
const AspireEvents = lazy(() => import("./pages/AspireEvents"));

const AspireEventSeptember2026 = lazy(() => import("./pages/AspireEventSeptember2026"));
const AspireEventSeptember2026Register = lazy(() => import("./pages/AspireEventSeptember2026Register"));
const AspireEventDecember2026 = lazy(() => import("./pages/AspireEventDecember2026"));
const AspireEventApril2026 = lazy(() => import("./pages/AspireEventApril2026"));
const AspireTypros = lazy(() => import("./pages/AspireTypros"));
const AspireNvidia = lazy(() => import("./pages/AspireNvidia"));
const AspireParkingDetails = lazy(() => import("./pages/AspireParkingDetails"));
const HqParkingDetails = lazy(() => import("./pages/HqParkingDetails"));
const HqGrandOpeningPhotos = lazy(() => import("./pages/HqGrandOpeningPhotos"));
const FreeAiWorkshop = lazy(() => import("./pages/FreeAiWorkshop"));
const FreeAiTrainingFaq = lazy(() => import("./pages/FreeAiTrainingFaq"));
const Partners = lazy(() => import("./pages/Partners"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const News = lazy(() => import("./pages/News"));
const GEMInvite = lazy(() => import("./pages/GEMInvite"));
const Donate = lazy(() => import("./pages/Donate"));
const AiAtWorkGuide = lazy(() => import("./pages/AiAtWorkGuide"));

const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

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
        <ScrollToHash />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/aspire" element={<Aspire />} />
            <Route path="/aspire/events" element={<AspireEvents />} />
            <Route path="/aspire/events/june-2026" element={<Navigate to="/aspire/events" replace />} />
            <Route path="/aspire/events/september-2026" element={<AspireEventSeptember2026 />} />
            <Route path="/aspire/events/september-2026/register" element={<AspireEventSeptember2026Register />} />
            <Route path="/aspire/events/september-2026/registration" element={<Navigate to="/aspire/events/september-2026/register" replace />} />
            {/* Old September 26 links (date changed to Sept 19) */}
            <Route path="/aspire/events/september-26-2026" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/aspire/events/sept-26-2026" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/aspire/events/sept-2026" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/aspire/events/september-19-2026" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/aspire/events/sept-19-2026" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/aspire/events/september-19" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/aspire/events/september-26" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/aspire/september-2026" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/september-2026" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/september-19-2026" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/september-26-2026" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/sept-19-2026" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/sept-26-2026" element={<Navigate to="/aspire/events/september-2026" replace />} />
            <Route path="/aspire/events/december-2026" element={<AspireEventDecember2026 />} />
            <Route path="/aspire/events/april-2026" element={<AspireEventApril2026 />} />
            <Route path="/aspire-typros" element={<AspireTypros />} />
            <Route path="/aspire-nvidia" element={<AspireNvidia />} />

            <Route path="/aspire/parking" element={<AspireParkingDetails />} />
            <Route path="/hq/parking" element={<HqParkingDetails />} />
            <Route path="/hqgrandopeningphotos" element={<HqGrandOpeningPhotos />} />
            <Route path="/free-ai-workshop" element={<FreeAiWorkshop />} />
            <Route path="/free-ai-training-faq" element={<FreeAiTrainingFaq />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/GEMinvite" element={<GEMInvite />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/resources/ai-at-work" element={<AiAtWorkGuide />} />

            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Short / guessed URLs people type or print */}
            <Route path="/events" element={<Navigate to="/aspire/events" replace />} />
            <Route path="/programs" element={<Navigate to="/aspire" replace />} />
            <Route path="/faq" element={<Navigate to="/free-ai-training-faq" replace />} />
            <Route path="/team" element={<Navigate to="/about#team-section" replace />} />

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
