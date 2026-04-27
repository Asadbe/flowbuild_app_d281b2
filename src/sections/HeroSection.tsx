import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COMPANY_LOGOS = [
  'Shopify', 'Stripe', 'Notion', 'Figma', 'HubSpot', 'Vercel', 'Airtable', 'Linear',
];

const letterVariants = {
  hidden: { opacity: 0, y: 40, skewY: 4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.55,
      delay: 0.2 + i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const HEADLINE_LINES = ['Build apps, tools', '& workflows —'];

export function HeroSection() {
  const scrollToCTA = () => {
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden hero-texture"
      style={{ background: '#0a0d12' }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-400/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="flex flex-col gap-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex w-fit"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-xs font-medium text-primary">
                <span className="text-primary">✦</span>
                Trusted by 2,000+ SMBs &nbsp;·&nbsp; No credit card required
              </div>
            </motion.div>

            {/* H1 — animated line by line */}
            <h1 className="text-[clamp(40px,6vw,76px)] font-black leading-[1.05] tracking-tight text-foreground">
              {HEADLINE_LINES.map((line, i) => (
                <motion.span
                  key={line}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="block overflow-hidden"
                >
                  {line}
                </motion.span>
              ))}
              <motion.span
                custom={2}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="block overflow-hidden"
              >
                <span className="gradient-text">without writing code.</span>
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              FlowBuild gives your team the power of a full dev team — drag, connect, deploy, and scale. In days, not months.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                size="lg"
                className="btn-glow bg-primary text-primary-foreground font-bold text-base px-8 h-13 hover:bg-primary/90"
                onClick={scrollToCTA}
              >
                Start Building for Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold text-base px-8 h-13 border-white/15 hover:border-primary/30"
              >
                <Play className="mr-2 w-4 h-4 text-primary" fill="currentColor" />
                Watch 2-min Demo
              </Button>
            </motion.div>

            {/* Social proof logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col gap-3 pt-2"
            >
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium">Trusted by teams at</p>
              <div className="flex flex-wrap gap-4 items-center">
                {COMPANY_LOGOS.map((logo) => (
                  <span
                    key={logo}
                    className="text-sm font-semibold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="animate-float relative">
              {/* Browser frame */}
              <div className="w-full max-w-[560px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                style={{ background: '#111620' }}>
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8" style={{ background: '#0d1018' }}>
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
                  <div className="ml-3 flex-1 h-6 rounded-md bg-white/5 border border-white/8 flex items-center px-3">
                    <span className="text-[10px] text-muted-foreground/50">app.flowbuild.io/canvas</span>
                  </div>
                </div>
                {/* Canvas area */}
                <div className="p-5 space-y-3" style={{ minHeight: 340 }}>
                  {/* Toolbar */}
                  <div className="flex gap-2 mb-4">
                    {['Button', 'Input', 'Table', 'Chart', 'Form'].map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded text-[10px] font-medium text-muted-foreground border border-white/8 bg-white/4 cursor-default">{t}</span>
                    ))}
                  </div>
                  {/* Component grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col gap-2">
                      <div className="h-2.5 w-16 rounded bg-primary/30" />
                      <div className="h-1.5 w-full rounded bg-white/10" />
                      <div className="h-1.5 w-3/4 rounded bg-white/10" />
                      <div className="mt-2 h-24 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center">
                        <div className="w-20 h-12 rounded border border-primary/20 bg-primary/8 flex flex-col gap-1 p-2">
                          <div className="h-1 w-full rounded bg-primary/40" />
                          <div className="h-1 w-2/3 rounded bg-primary/20" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/4 p-3 flex flex-col gap-2">
                        <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                          <span className="text-primary text-[10px]">⚡</span>
                        </div>
                        <div className="h-1.5 w-full rounded bg-white/15" />
                        <div className="h-1.5 w-2/3 rounded bg-white/8" />
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/4 p-3 flex flex-col gap-2">
                        <div className="w-6 h-6 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                          <span className="text-cyan-400 text-[10px]">◈</span>
                        </div>
                        <div className="h-1.5 w-full rounded bg-white/15" />
                        <div className="h-1.5 w-1/2 rounded bg-white/8" />
                      </div>
                    </div>
                  </div>
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {['Active Users', 'Revenue', 'Conversions'].map((label, i) => (
                      <div key={label} className="rounded-lg border border-white/8 bg-white/3 p-2.5">
                        <div className="text-[10px] text-muted-foreground/60 mb-1">{label}</div>
                        <div className="text-sm font-bold text-primary">{['2.4K', '$18K', '94%'][i]}</div>
                      </div>
                    ))}
                  </div>
                  {/* CTA row */}
                  <div className="flex gap-2 pt-1">
                    <div className="flex-1 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="text-[10px] font-semibold text-primary">Deploy Live →</span>
                    </div>
                    <div className="h-8 w-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <span className="text-[10px] text-muted-foreground">Preview</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow halo */}
              <div className="absolute -inset-8 rounded-3xl bg-primary/8 blur-3xl -z-10" />
              {/* Floating chips */}
              <div className="absolute -top-5 -right-5 px-3 py-1.5 rounded-xl border border-primary/25 bg-primary/10 text-[11px] font-semibold text-primary backdrop-blur-sm shadow-lg">
                ✓ Deployed in 3s
              </div>
              <div className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 text-[11px] font-medium text-foreground/70 backdrop-blur-sm shadow-lg">
                🔗 200+ Integrations
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
