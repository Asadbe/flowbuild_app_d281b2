import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const STEPS = [
  {
    number: '01',
    emoji: '🎨',
    title: 'Design',
    description: 'Drag components onto your canvas. Choose from 100+ pre-built UI blocks. No design skills required.',
  },
  {
    number: '02',
    emoji: '⚡',
    title: 'Connect',
    description: 'Wire up your data sources, APIs and automations without any backend code. Works with everything.',
  },
  {
    number: '03',
    emoji: '🚀',
    title: 'Publish',
    description: 'Hit deploy and share your live app with a custom URL in seconds. Scale with one click.',
  },
];

const INTEGRATIONS = [
  'Stripe', 'Slack', 'Airtable', 'Google Sheets', 'HubSpot', 'Zapier',
  'Notion', 'Twilio', 'Salesforce', 'Shopify', 'Mailchimp', 'Intercom',
  'Stripe', 'Slack', 'Airtable', 'Google Sheets', 'HubSpot', 'Zapier',
  'Notion', 'Twilio', 'Salesforce', 'Shopify', 'Mailchimp', 'Intercom',
];

export function HowItWorksSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 relative overflow-hidden transition-colors duration-300"
      style={{ background: isDark ? '#0d1018' : '#eef1f5' }}
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
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-4">How It Works</p>
          <h2 className="text-[clamp(28px,4vw,52px)] font-black tracking-tight text-foreground">
            From idea to live app in 3 steps
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20 relative">
          {/* Connector lines (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-px step-connector opacity-40" />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center gap-5"
            >
              {/* Big decorative number */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-[80px] font-black leading-none select-none pointer-events-none"
                style={{
                  color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)',
                  fontFamily: 'var(--font-heading)',
                  zIndex: 0,
                }}
              >
                {step.number}
              </div>
              {/* Step circle */}
              <div className="relative z-10 w-20 h-20 rounded-2xl border border-primary/25 bg-primary/8 flex items-center justify-center text-3xl shadow-lg">
                {step.emoji}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integrations marquee */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-8"
          style={{
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          }}
        >
          <p className="text-center text-xs text-muted-foreground/60 uppercase tracking-widest font-medium mb-6">
            200+ integrations ready to plug in
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-10 animate-marquee whitespace-nowrap w-max">
              {INTEGRATIONS.map((name, i) => (
                <span
                  key={i}
                  className="text-sm font-semibold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
