import React, { useState, useEffect } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#testimonials' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'nav-scrolled' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" fill="currentColor" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              FlowBuild
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="nav-link text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 bg-transparent border-0 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 bg-transparent border-0 cursor-pointer">
              Sign In
            </button>
            <Button
              size="sm"
              className="btn-glow bg-primary text-primary-foreground font-semibold px-5 hover:bg-primary/90"
              onClick={() => scrollTo('#cta')}
            >
              Start for Free →
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu md:hidden fixed inset-0 top-16 z-40 flex flex-col px-6 py-8 gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left text-xl font-semibold text-foreground hover:text-primary transition-colors bg-transparent border-0 cursor-pointer py-2"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button className="text-left text-base text-muted-foreground hover:text-foreground transition-colors bg-transparent border-0 cursor-pointer">
              Sign In
            </button>
            <Button
              size="lg"
              className="btn-glow bg-primary text-primary-foreground font-semibold w-full"
              onClick={() => scrollTo('#cta')}
            >
              Start for Free →
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
