import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import DashboardSection from "./components/DashboardSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import FutureSection from "./components/FutureSection";
import HeroSection from "./components/HeroSection";
import MarqueeStrip from "./components/MarqueeStrip";
import Navbar from "./components/Navbar";
import PracticeSection from "./components/PracticeSection";
import SolverSection from "./components/SolverSection";
import SubjectsSection from "./components/SubjectsSection";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <FeaturesSection />
        <SubjectsSection />
        <DashboardSection />
        <SolverSection />
        <PracticeSection />
        <FutureSection />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: PrivacyPolicy,
});

const routeTree = rootRoute.addChildren([homeRoute, privacyRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
