import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[98%] active:ring-0 active:shadow-none transition-all ease-out',
  {
    variants: {
      color: {
        primary: 'text-primary-foreground bg-primary',
        accent: 'text-accent-foreground bg-accent',
        danger: 'text-danger-50 bg-danger-500',
        success: 'text-success-50 bg-success-500',
        warning: 'text-warning-50 bg-warning-500',
      },
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        outline: 'border border-input bg-transparent shadow-sm',
        ghost: '',
        light: '',
        flat: '',
      },
      size: {
        md: 'h-9 px-4 py-2 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:mr-1',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
      isIconOnly: {
        true: 'aspect-square p-0',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      color: 'primary',
      isIconOnly: false,
    },
    compoundVariants: [
      //Outline
      {
        color: 'primary',
        variant: 'outline',
        className: 'border-primary text-primary hover:bg-transparent hover:text-primary',
      },
      {
        color: 'accent',
        variant: 'outline',
        className: 'border-accent text-accent-foreground hover:bg-transparent hover:text-primary-foreground',
      },
      {
        color: 'danger',
        variant: 'outline',
        className: 'border-danger-500 text-danger-500 hover:bg-transparent hover:text-danger-500',
      },
      {
        color: 'success',
        variant: 'outline',
        className: 'border-success-500 text-success-500 hover:bg-transparent hover:text-success-500',
      },
      {
        color: 'warning',
        variant: 'outline',
        className: 'border-warning-500 text-warning-500 hover:bg-transparent hover:text-waning-500',
      },
      //Default
      {
        color: 'primary',
        variant: 'default',
        className: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      {
        color: 'accent',
        variant: 'default',
        className: 'bg-accent text-accent-foreground hover:bg-accent/90',
      },
      {
        color: 'danger',
        variant: 'default',
        className: 'bg-danger-500 text-danger-50 hover:bg-danger-500/90',
      },
      {
        color: 'success',
        variant: 'default',
        className: 'bg-success-500 text-success-50 hover:bg-success-500/90',
      },
      {
        color: 'warning',
        variant: 'default',
        className: 'bg-warning-500 text-warning-50 hover:bg-warning-500/90',
      },

      //Ghost
      {
        color: 'primary',
        variant: 'ghost',
        className:
          'border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent  border',
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
        className: 'bg-transparent text-primary hover:bg-primary/70 hover:text-primary-foreground',
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

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, color, isIconOnly, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className, color, isIconOnly }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
