import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useTheme } from '@/context/ThemeContext';

const FAQS = [
  {
    q: 'Do I need coding skills to use FlowBuild?',
    a: 'Not at all! FlowBuild is designed for non-technical users. If you can use a spreadsheet or presentation software, you can build powerful apps with FlowBuild. Our drag-and-drop interface makes it easy for anyone on your team.',
  },
  {
    q: 'How does the free plan work?',
    a: 'The Starter plan is completely free, forever. You get up to 3 apps, 10 data sources, and access to 100+ UI components with no time limit and no credit card required. Upgrade when you need more capacity.',
  },
  {
    q: 'Can I connect FlowBuild to my existing tools?',
    a: 'Yes! FlowBuild integrates with 200+ tools including Stripe, Slack, Airtable, Google Sheets, HubSpot, Zapier, Salesforce, and many more. You can also connect to any custom REST API or database.',
  },
  {
    q: 'Is my data secure on FlowBuild?',
    a: "Absolutely. FlowBuild is SOC 2 Type II certified and GDPR compliant. All data is encrypted in transit and at rest. We offer enterprise-grade security features like SSO, audit logs, and role-based access control on the Scale plan.",
  },
  {
    q: 'What happens if I need to cancel my subscription?',
    a: 'You can cancel anytime with no penalties or fees. Your apps will remain accessible on the free tier limits. We believe in earning your business every month, not locking you in.',
  },
  {
    q: 'Can my whole team collaborate on apps?',
    a: 'Yes! FlowBuild supports real-time collaboration, comments, version history, and role-based permissions. On the Growth plan, teams of up to 10 can work together. The Scale plan supports unlimited team members.',
  },
  {
    q: 'Do apps built on FlowBuild scale well?',
    a: 'FlowBuild is built on enterprise infrastructure that auto-scales with your usage. Our customers have built apps serving tens of thousands of users. We guarantee 99.9% uptime on all paid plans.',
  },
];

export function FAQSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 relative transition-colors duration-300"
      style={{ background: isDark ? '#0a0d12' : '#f4f6f9' }}
    >
      <div className="absolute inset-0 hero-texture opacity-30 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-4">FAQ</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-tight text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-base">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our support team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm sm:text-base font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
