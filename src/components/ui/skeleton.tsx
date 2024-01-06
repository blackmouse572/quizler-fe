import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-accent animate-pulse rounded-md duration-[1700] ease-in-out', 'h-full w-1/6', className)}
      {...props}
    />
  );
}

export { Skeleton };
