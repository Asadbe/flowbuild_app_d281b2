import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchPlans } from '@/lib/api';
import { useTheme } from '@/context/ThemeContext';

interface Plan {
  id?: string | number;
  name: string;
  price_monthly?: number;
  price_yearly?: number;
  description?: string;
  features?: string;
  is_popular?: boolean;
  cta_label?: string;
}

const FALLBACK_PLANS: Plan[] = [
  {
    id: 1,
    name: 'Starter',
    price_monthly: 0,
    price_yearly: 0,
    description: 'Perfect for individuals and small teams just getting started.',
    features: 'Up to 3 apps\n10 data sources\n100+ UI components\nCommunity support\n1GB storage\nCustom domain',
    is_popular: false,
    cta_label: 'Start for Free',
  },
  {
    id: 2,
    name: 'Growth',
    price_monthly: 49,
    price_yearly: 39,
    description: 'For growing teams that need more power, collaboration and scale.',
    features: 'Unlimited apps\nUnlimited data sources\nAll UI components + AI\nTeam collaboration (up to 10)\n50GB storage\nPriority support\nCustom branding\nAdvanced analytics',
    is_popular: true,
    cta_label: 'Start Free Trial',
  },
  {
    id: 3,
    name: 'Scale',
    price_monthly: 149,
    price_yearly: 119,
    description: 'For larger organizations with enterprise-grade needs.',
    features: 'Everything in Growth\nUnlimited team members\nSSO & SAML\nAudit logs\n500GB storage\nSLA guarantee\nDedicated success manager\nCustom integrations',
    is_popular: false,
    cta_label: 'Contact Sales',
  },
];

const TRUST_BADGES = [
  { icon: Shield, label: 'SOC 2 Compliant' },
  { icon: Shield, label: 'GDPR Ready' },
  { icon: Check, label: '99.9% Uptime SLA' },
  { icon: Check, label: 'Cancel anytime' },
];

export function PricingSection() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearly, setYearly] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    fetchPlans()
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setPlans(list.length > 0 ? list : FALLBACK_PLANS);
      })
      .catch(() => setPlans(FALLBACK_PLANS))
      .finally(() => setLoading(false));
  }, []);

  const display = loading || plans.length === 0 ? FALLBACK_PLANS : plans;

  const getPrice = (plan: Plan) => {
    if (yearly) return plan.price_yearly ?? 0;
    return plan.price_monthly ?? 0;
  };

  const parseFeatures = (featuresStr?: string): string[] => {
    if (!featuresStr) return [];
    return featuresStr.split('\n').filter(Boolean);
  };

  return (
    <section
      id="pricing"
      className="py-24 lg:py-32 relative transition-colors duration-300"
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
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-4">Pricing</p>
          <h2 className="text-[clamp(28px,4vw,52px)] font-black tracking-tight text-foreground mb-5">
            Simple, transparent pricing
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Scale as you grow. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div
            className="flex items-center gap-3 px-2 py-2 rounded-full border transition-colors duration-300"
            style={{
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
            }}
          >
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border-0 ${
                !yearly ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground bg-transparent'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border-0 ${
                yearly ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground bg-transparent'
              }`}
            >
              Yearly
              {yearly && <span className="text-[10px] font-bold">Save 20%</span>}
              {!yearly && <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">Save 20%</span>}
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {display.map((plan, i) => {
            const price = getPrice(plan);
            const featureList = parseFeatures(plan.features);
            const isPopular = plan.is_popular ?? false;

            return (
              <motion.div
                key={plan.id ?? i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl border p-8 transition-colors duration-300 ${
                  isPopular
                    ? 'plan-popular border-primary/60 scale-[1.03] z-10'
                    : ''
                }`}
                style={{
                  background: isPopular
                    ? isDark
                      ? 'linear-gradient(160deg, rgba(0,229,160,0.06) 0%, #111620 40%)'
                      : 'linear-gradient(160deg, rgba(0,180,120,0.06) 0%, #ffffff 40%)'
                    : isDark
                    ? '#111620'
                    : '#ffffff',
                  borderColor: isPopular
                    ? undefined
                    : isDark
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(0,0,0,0.07)',
                }}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="popular" className="px-4 py-1 text-xs font-bold shadow-lg">
                      ✦ Most Popular
                    </Badge>
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-[48px] font-black text-foreground leading-none">
                      {price === 0 ? 'Free' : `$${price}`}
                    </span>
                    {price > 0 && <span className="text-muted-foreground text-sm mb-2">/mo</span>}
                  </div>
                  {yearly && price > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">per month, billed yearly</p>
                  )}
                </div>

                {/* Divider */}
                <div
                  className="h-px mb-6 transition-colors duration-300"
                  style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }}
                />

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {featureList.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm text-foreground/80">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={isPopular ? 'default' : 'outline'}
                  size="lg"
                  className={`w-full font-semibold ${
                    isPopular ? 'btn-glow bg-primary text-primary-foreground hover:bg-primary/90' : ''
                  }`}
                >
                  {plan.cta_label ?? 'Get Started'}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-6 mt-14"
        >
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <badge.icon className="w-4 h-4 text-primary" />
              {badge.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
