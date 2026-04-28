import React from 'react';
import { Zap, Globe, Mail, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/context/ThemeContext';

const FOOTER_LINKS = [
  {
    label: 'Product',
    links: ['Builder', 'Integrations', 'Templates', 'Changelog', 'Roadmap'],
  },
  {
    label: 'Company',
    links: ['About', 'Careers', 'Blog', 'Press', 'Contact'],
  },
  {
    label: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Security', 'Cookie Settings'],
  },
];

const SOCIAL_LINKS = [
  { Icon: ExternalLink, label: 'Twitter / X' },
  { Icon: Globe, label: 'LinkedIn' },
  { Icon: ExternalLink, label: 'GitHub' },
  { Icon: Mail, label: 'Email' },
];

export function FooterSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className="border-t transition-colors duration-300"
      style={{
        background: isDark ? '#111620' : '#e8ecf1',
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" fill="currentColor" />
              </div>
              <span
                className="font-heading font-bold text-lg text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                FlowBuild
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
              Build anything. Deploy anywhere. No code needed.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-pointer"
                  style={{
                    borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Cols 2–4 */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.label} className="flex flex-col gap-4">
              <h4
                className="text-xs font-semibold uppercase tracking-[0.12em]"
                style={{ color: isDark ? 'rgba(255,255,255,0.50)' : 'rgba(0,0,0,0.45)' }}
              >
                {section.label}
              </h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator
          className="my-10"
          style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/60">
            &copy; 2025 FlowBuild, Inc. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Made with ⚡ for builders
          </p>
        </div>
      </div>
    </footer>
  );
}
