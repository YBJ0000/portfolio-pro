import Link, { type LinkProps } from 'next/link'

import { cn } from '~/lib/cn'

export function Card({
  as: Component = 'div',
  className,
  children,
  ...props
}: {
  as?: keyof JSX.IntrinsicElements
  className?: string
  children: React.ReactNode
  onMouseMove?: React.MouseEventHandler
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
}) {
  return (
    <Component
      className={cn(className, 'group relative flex flex-col items-start')}
      {...props}
    >
      {children}
    </Component>
  )
}

Card.Link = function CardLink({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'a'> &
  LinkProps & { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-200/30 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-700/20 sm:-inset-x-6 sm:rounded-2xl" />
      <Link className={className} {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

Card.Description = function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400',
        className
      )}
    >
      {children}
    </p>
  )
}
