import DashboardSection from "./components/DashboardSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import FutureSection from "./components/FutureSection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import PracticeSection from "./components/PracticeSection";
import SolverSection from "./components/SolverSection";
import SubjectsSection from "./components/SubjectsSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
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
