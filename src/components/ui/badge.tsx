import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary border border-primary/20',
        secondary: 'bg-white/5 text-foreground/70 border border-white/10',
        outline: 'border border-white/15 text-foreground/70',
        success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        builder: 'bg-primary/10 text-primary border border-primary/20',
        ai: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
        team: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        data: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
        popular: 'bg-primary text-primary-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);
Badge.displayName = 'Badge';
