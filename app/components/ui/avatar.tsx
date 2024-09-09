import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import CatAvatar from '~/components/color-icons/cat-avatar'
import { cn } from '~/lib/utils'
import { Skeleton } from './skeleton'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => {
  const [loading, setLoading] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>('loading')

  const handleLoadingStatusChange = (status: 'idle' | 'loading' | 'loaded' | 'error') => {
    setLoading(status)
  }

  return (
    <>
      {loading === 'loading' && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-full" />
      )}
      <AvatarPrimitive.Image
        ref={ref}
        className={cn(
          'absolute inset-0 z-10 mx-auto mb-auto mt-[20%] aspect-square h-[66%] w-[66%] rounded-full transition-opacity',
          className,
          loading === 'loading' ? 'opacity-0' : 'opacity-100'
        )}
        onLoadingStatusChange={handleLoadingStatusChange}
        {...props}
      />
      {loading === 'loaded' && (
        <CatAvatar className={cn('absolute inset-0 z-0 transition-opacity')} />
      )}
    </>
  )
})
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'relative flex h-full w-full items-center justify-center rounded-full',
      className
    )}
    {...props}
  >
    <CatAvatar className="absolute inset-0" />
  </AvatarPrimitive.Fallback>
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
