import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuickInfo from "./components/QuickInfo";
import CompetitionsSection from "./components/CompetitionsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300 flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 flex flex-col gap-8 md:gap-12 animate-in fade-in duration-500">
        <Hero />
        <QuickInfo />
        <CompetitionsSection />
      </main>
    </div>
  );
}
