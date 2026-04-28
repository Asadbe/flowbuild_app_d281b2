import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { fetchTestimonials } from '@/lib/api';
import { getInitials, hashColor } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface Testimonial {
  id?: string | number;
  author_name: string;
  author_title?: string;
  author_company?: string;
  avatar_url?: string;
  quote: string;
  rating?: number;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    author_name: 'Sarah Chen',
    author_title: 'Head of Operations',
    author_company: 'RetailFlow Inc.',
    quote: 'FlowBuild replaced 3 different tools we were paying for. We shipped our internal dashboard in under a week — something that would have taken months with a dev team.',
    rating: 5,
  },
  {
    id: 2,
    author_name: 'Marcus Webb',
    author_title: 'Co-Founder & CEO',
    author_company: 'Launchpad Studio',
    quote: 'As a non-technical founder, FlowBuild has been a complete game changer. I can now build and iterate on product features myself without waiting for engineering.',
    rating: 5,
  },
  {
    id: 3,
    author_name: 'Priya Sharma',
    author_title: 'Product Manager',
    author_company: 'FinanceOS',
    quote: 'The integrations are unreal. We connected to Stripe, our internal APIs, and Airtable in one afternoon. The apps just work, and the team loves them.',
    rating: 5,
  },
  {
    id: 4,
    author_name: 'Tom Aldridge',
    author_title: 'Director of Sales',
    author_company: 'Nexus CRM',
    quote: 'We built a fully custom CRM on top of FlowBuild in two weeks. Our sales team is 40% more productive and we saved $80K on custom development.',
    rating: 5,
  },
];

const STATS = [
  { value: '2,000+', label: 'Teams using FlowBuild' },
  { value: '150K+', label: 'Apps built on platform' },
  { value: '94%', label: 'Customer satisfaction rate' },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    fetchTestimonials()
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setTestimonials(list.length > 0 ? list : FALLBACK_TESTIMONIALS);
      })
      .catch(() => setTestimonials(FALLBACK_TESTIMONIALS))
      .finally(() => setLoading(false));
  }, []);

  const display = loading || testimonials.length === 0 ? FALLBACK_TESTIMONIALS : testimonials;

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 relative transition-colors duration-300"
      style={{ background: isDark ? '#0a0d12' : '#f4f6f9' }}
    >
      <div className="absolute inset-0 hero-texture opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-4">Testimonials</p>
          <h2 className="text-[clamp(28px,4vw,52px)] font-black tracking-tight text-foreground">
            Loved by teams like yours
          </h2>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 rounded-2xl border p-8 transition-colors duration-300"
          style={{
            background: isDark ? '#111620' : '#ffffff',
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i < STATS.length - 1
                  ? `sm:border-r`
                  : ''
              }`}
              style={{
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
              }}
            >
              <span className="stat-number text-4xl sm:text-5xl font-black mb-2">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {display.map((t, i) => (
            <motion.div
              key={t.id ?? i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border p-7 flex flex-col gap-4 transition-colors duration-300"
              style={{
                background: isDark ? '#111620' : '#ffffff',
                borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating ?? 5 }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              {/* Quote */}
              <p className="text-foreground/90 leading-relaxed text-sm flex-1">&ldquo;{t.quote}&rdquo;</p>
              {/* Author */}
              <div
                className="flex items-center gap-3 pt-2 border-t transition-colors duration-300"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
              >
                <Avatar className="w-10 h-10">
                  {t.avatar_url ? (
                    <AvatarImage src={t.avatar_url} alt={t.author_name} />
                  ) : null}
                  <AvatarFallback
                    style={{ background: hashColor(t.author_name) + '28', color: hashColor(t.author_name) }}
                  >
                    {getInitials(t.author_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.author_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.author_title}{t.author_company ? ` · ${t.author_company}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
