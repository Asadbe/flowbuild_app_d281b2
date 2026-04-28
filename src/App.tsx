import React, { useEffect, useState } from 'react';
import './index.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/sections/HeroSection';
import { FeaturesSection } from '@/sections/FeaturesSection';
import { HowItWorksSection } from '@/sections/HowItWorksSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { PricingSection } from '@/sections/PricingSection';
import { FAQSection } from '@/sections/FAQSection';
import { CTASection } from '@/sections/CTASection';
import { FooterSection } from '@/sections/FooterSection';
import { ArrowUp } from 'lucide-react';

function AppInner() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowTop(scrolled > 400);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>

      <FooterSection />

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 border border-primary/50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
