import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitWaitlist } from '@/lib/api';
import { useTheme } from '@/context/ThemeContext';

export function CTASection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    try {
      await submitWaitlist({ email: email.trim(), status: 'pending' });
      setSuccess(true);
      setEmail('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="cta"
      className="py-28 lg:py-36 relative overflow-hidden transition-colors duration-300"
      style={{ background: isDark ? '#0a0d12' : '#f4f6f9' }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 radial-glow-center pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 hero-texture opacity-30 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-7"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-xs font-medium text-primary">
            <span>✦</span> Limited Early Access — Join Free
          </div>

          <h2 className="text-[clamp(32px,5vw,64px)] font-black tracking-tight text-foreground leading-tight">
            Ready to build
            <br />
            <span className="gradient-text">without limits?</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Join 2,000+ businesses already building on FlowBuild. Start free — no credit card required.
          </p>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-primary" />
              </div>
              <p className="text-foreground font-semibold text-lg">You&apos;re on the list!</p>
              <p className="text-muted-foreground text-sm">We&apos;ll be in touch very soon. Check your inbox.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 text-base"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                }}
                required
              />
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="btn-glow bg-primary text-primary-foreground font-bold h-12 px-7 whitespace-nowrap hover:bg-primary/90"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <p className="text-xs text-muted-foreground/60">
            Free forever plan available &nbsp;·&nbsp; Setup in under 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
