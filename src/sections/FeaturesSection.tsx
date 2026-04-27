import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, LayoutGrid, Users, Database, Shield, Sparkles, Activity, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { fetchFeatures } from '@/lib/api';

interface Feature {
  id?: string | number;
  title: string;
  description: string;
  icon?: string;
  category?: string;
  sort_order?: number;
}

const FALLBACK_FEATURES: Feature[] = [
  { id: 1, title: 'Drag & Drop Builder', description: 'Build powerful UIs visually with 100+ pre-built components. No design skills needed.', icon: 'LayoutGrid', category: 'Builder' },
  { id: 2, title: 'AI-Powered Suggestions', description: 'Smart AI assists you in designing flows, writing automations, and optimizing your apps.', icon: 'Sparkles', category: 'AI' },
  { id: 3, title: 'Team Collaboration', description: 'Work together in real-time with your team. Comments, version history, and role-based access.', icon: 'Users', category: 'Team' },
  { id: 4, title: 'Data Connections', description: 'Connect to any database, REST API, or spreadsheet with zero backend code required.', icon: 'Database', category: 'Data' },
  { id: 5, title: 'Enterprise Security', description: 'SOC 2 Type II certified, GDPR ready, with SSO and audit logs built in from day one.', icon: 'Shield', category: 'Security' },
  { id: 6, title: 'Live Analytics', description: 'Track usage, monitor performance, and understand how your users interact with your apps.', icon: 'Activity', category: 'Analytics' },
];

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutGrid, Sparkles, Users, Database, Shield, Activity, Zap, Globe,
};

const CATEGORY_VARIANT: Record<string, 'builder' | 'ai' | 'team' | 'data' | 'default'> = {
  Builder: 'builder', AI: 'ai', Team: 'team', Data: 'data',
  Security: 'default', Analytics: 'default',
};

export function FeaturesSection() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatures()
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setFeatures(list.length > 0 ? list : FALLBACK_FEATURES);
      })
      .catch(() => setFeatures(FALLBACK_FEATURES))
      .finally(() => setLoading(false));
  }, []);

  const displayFeatures = loading ? FALLBACK_FEATURES : features.length > 0 ? features : FALLBACK_FEATURES;

  return (
    <section id="features" className="py-24 lg:py-32 relative" style={{ background: '#0a0d12' }}>
      <div className="absolute inset-0 hero-texture opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-4">Product Features</p>
          <h2 className="text-[clamp(28px,4vw,52px)] font-black tracking-tight text-foreground mb-5">
            Everything your team needs to ship faster
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            No developers? No problem. FlowBuild gives every role on your team superpowers.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayFeatures.map((feature, i) => {
            const IconComp = ICON_MAP[feature.icon ?? ''] ?? Zap;
            const cat = feature.category ?? 'Builder';
            const variant = CATEGORY_VARIANT[cat] ?? 'default';
            return (
              <motion.div
                key={feature.id ?? i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div
                  className="feature-card h-full rounded-2xl border p-6 flex flex-col gap-4"
                  style={{ background: '#111620', borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/12 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <IconComp className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant={variant as 'builder' | 'ai' | 'team' | 'data' | 'default'}>{cat}</Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 text-[15px]">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
