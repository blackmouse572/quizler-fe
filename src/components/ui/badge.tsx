import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full',
  {
    variants: {
      color: {
        primary: 'text-primary-foreground bg-primary border-primary',
        accent: 'text-accent-foreground bg-accent border-accent',
        danger: 'text-danger-50 bg-danger-500 border-danger-500',
        success: 'text-success-50 bg-success-500 border-success-500',
        warning: 'text-warning-50 bg-warning-500 border-warning-500',
      },
      variant: {
        default: 'border-transparent shadow hover:bg-primary/80',
        outline: 'border bg-transparent',
        ghost: '',
        light: '',
        flat: '',
      },
      size: {
        sm: 'px-2 h-6 text-2xs',
        md: 'px-3 h-7 text-xs',
        lg: 'px-4 h-8 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'primary',
      size: 'md',
    },
    compoundVariants: [
      //Outline
      {
        color: 'primary',
        variant: 'outline',
        className: 'text-primary',
      },
      {
        color: 'accent',
        variant: 'outline',
        className: 'text-accent-foreground',
      },
      {
        color: 'danger',
        variant: 'outline',
        className: 'text-danger-500',
      },
      {
        color: 'success',
        variant: 'outline',
        className: 'text-success-500',
      },
      {
        color: 'warning',
        variant: 'outline',
        className: 'text-warning-500',
      },

      {
        color: 'primary',
        variant: 'ghost',
        className:
          'border-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground bg-transparent  border',
      },
      {
        color: 'accent',
        variant: 'ghost',
        className:
          'border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground bg-transparent border',
      },
      {
        color: 'danger',
        variant: 'ghost',
        className: 'border-danger-500 text-danger-500 hover:bg-danger-500 hover:text-danger-50 bg-transparent border',
      },
      {
        color: 'success',
        variant: 'ghost',
        className:
          'border-success-500 text-success-500 hover:bg-success-500 hover:text-success-50 bg-transparent border',
      },
      {
        color: 'warning',
        variant: 'ghost',
        className:
          'border-warning-500 text-warning-500 hover:bg-warning-500 hover:text-warning-50 bg-transparent border',
      },

      //Light
      {
        color: 'primary',
        variant: 'light',
        className: 'bg-transparent text-primary hover:bg-primary/70',
      },
      {
        color: 'accent',
        variant: 'light',
        className: 'bg-transparent text-accent hover:bg-accent/70',
      },
      {
        color: 'danger',
        variant: 'light',
        className: 'bg-transparent text-danger-500 hover:bg-danger-500/20',
      },
      {
        color: 'success',
        variant: 'light',
        className: 'bg-transparent text-success-500 hover:bg-success-500/20',
      },
      {
        color: 'warning',
        variant: 'light',
        className: 'bg-transparent text-warning-500 hover:bg-warning-500/20',
      },

      //Flat
      {
        color: 'primary',
        variant: 'flat',
        className: 'bg-primary/20 text-primary',
      },
      {
        color: 'accent',
        variant: 'flat',
        className: 'bg-accent/20 text-accent-foreground',
      },
      {
        color: 'danger',
        variant: 'flat',
        className: 'bg-danger-500/20 text-danger-500',
      },
      {
        color: 'success',
        variant: 'flat',
        className: 'bg-success-500/20 text-success-500',
      },
      {
        color: 'warning',
        variant: 'flat',
        className: 'bg-warning-500/20 text-warning-500',
      },
    ],
  }
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, color, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ color, size, variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
