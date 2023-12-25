import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse ease-in-out duration-[1700] rounded-md bg-accent', 'h-full w-1/6', className)}
      {...props}
    />
  );
}

export { Skeleton };
