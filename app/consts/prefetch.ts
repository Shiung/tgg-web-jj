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
  /* 紅包彈窗 */
  {
    rel: 'preload',
    href: '/images/lucky-money/open-lucky-bag.png',
    as: 'image',
  },
  /* 紅包 lottie */
  {
    rel: 'preload',
    href: '/images/lucky-money/lottie/lucky-bag/images/cat_sad_2.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/lucky-money/lottie/lucky-bag/images/cat-rank-yello2_1.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/lucky-money/lottie/lucky-bag/images/shine__f0007__1_.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/lucky-money/lottie/lucky-bag/images/luckybagb.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/lucky-money/lottie/lucky-bag/images/luckybagf.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/lucky-money/lottie/lucky-bag/images/luckybags.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/lucky-money/lottie/lucky-bag/images/luckybagy.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/___1_4x.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/___2_4x.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/___3_4x.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/___4_4x.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/___5_4x.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/___6_4x.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/___7_4x.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/___8_4x.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/___9_4x.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/___10_4x.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/c00.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/c1.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/c01.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/c2.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/c02.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/c3.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/c03.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/c4.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/c04.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/c05.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/cb.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/cf.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/Ellipse_6525.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/Ellipse_6526.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/face_hit.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/face_normal.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/g00.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/g1.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/g01.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/g2.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/g02.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/g3.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/g03.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/g4.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/g04.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/g05.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/gb.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/gf.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/s00.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/s1.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/s01.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/s2.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/s02.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/s3.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/s03.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/s4.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/s04.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/s05.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/sb.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/sf.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/hammer.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/image_13928_1.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/lottie/image_13928.png',
    as: 'image',
  },
  {
    rel: 'preload',
    href: '/images/smash-egg/bg-main.png',
    as: 'image',
  },
]
