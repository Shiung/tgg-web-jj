import type { LinkDescriptor } from '@remix-run/node'

export const iconsLinks: LinkDescriptor[] = [
  // favicon
  { rel: 'icon', href: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
  {
    rel: 'icon',
    href: '/favicon-32x32.png',
    sizes: '32x32',
    type: 'image/png',
  },
  {
    rel: 'icon',
    href: '/favicon-48x48.png',
    sizes: '48x48',
    type: 'image/png',
  },
  {
    rel: 'icon',
    href: '/favicon-64x64.png',
    sizes: '64x64',
    type: 'image/png',
  },
  {
    rel: 'apple-touch-icon',
    href: '/apple-touch-icon.png',
    sizes: '180x180',
  },
  {
    rel: 'icon',
    href: '/android-chrome-192x192.png',
    sizes: '192x192',
    type: 'image/png',
  },
  {
    rel: 'icon',
    href: '/android-chrome-512x512.png',
    sizes: '512x512',
    type: 'image/png',
  },
]

export const prefetchAssetsLinks: LinkDescriptor[] = [
  // images
  {
    rel: 'preload',
    href: '/images/loading.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/system-bg.png',
    as: 'image',
  },
]
