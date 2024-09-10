import type { MetaFunction } from '@remix-run/node'
import { Boxes } from 'lucide-react'
import { Button } from '~/components/ui/button'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel'

export const meta: MetaFunction = () => {
  return [{ title: 'Kokon' }, { name: 'description', content: 'Welcome to Kokon!' }]
}

const bannerSlides = [
  {
    id: 1,
    title: 'WELCOME TO KOKON',
    content: 'Play with neko, earn kokon!',
    imgSrc: '/images/home/carousel/banner-cat.png',
    imgAlt: 'banner-cat',
  },
  {
    id: 2,
    title: 'SMASH EGG',
    content: 'Play with neko, earn kokon!',
    imgSrc: '/images/home/carousel/banner-egg.png',
    imgAlt: 'banner-egg',
  },
]

const newReleaseSlides = [
  {
    id: 1,
    title: 'NEKO GAME',
    imgSrc: '/images/home/carousel/game-cover1.png',
    imgAlt: '',
  },
  {
    id: 2,
    title: 'NEKO GAME 2',
    imgSrc: '/images/home/carousel/game-cover2.png',
    imgAlt: '',
  },
  {
    id: 3,
    title: 'NEKO GAME 3',
    imgSrc: '/images/home/carousel/game-cover3.png',
    imgAlt: '',
  },
  {
    id: 4,
    title: 'NEKO GAME 4',
    imgSrc: '/images/home/carousel/game-cover1.png',
    imgAlt: '',
  },
  {
    id: 5,
    title: 'NEKO GAME 5',
    imgSrc: '/images/home/carousel/game-cover2.png',
    imgAlt: '',
  },
]

export default function Index() {
  return (
    <div className="container px-0 pb-safe pt-3">
      {/* banner carousel */}
      <div className="relative aspect-[375/168] w-full rounded-t-xl bg-black">
        <div className="absolute inset-0 py-3">
          <div className="animate-background-wave h-full w-full bg-[url('/images/home/carousel/bg.png')] bg-cover bg-center bg-repeat-x" />
        </div>
        <Carousel className="w-full px-4 py-3" plugins={[Autoplay({ delay: 3000 })]}>
          <CarouselContent className="ml-0">
            {bannerSlides.map(slide => (
              <CarouselItem
                key={slide.id}
                className="relative flex aspect-[343/140] justify-between"
              >
                <div className="absolute inset-y-3 left-4 flex w-[43%] flex-col justify-center break-words">
                  <h1 className="text-2xl font-extrabold">{slide.title}</h1>
                  <p className="mt-1 text-xs font-normal text-primary">{slide.content}</p>
                </div>
                <img
                  src={slide.imgSrc}
                  alt={slide.imgAlt}
                  className="absolute inset-0 object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      {/* Game entrance */}
      <div className="flex flex-col bg-black px-4 pt-4">
        <div className="flex w-full space-x-2 bg-black">
          <Button className="flex-1" catEars>
            CASUAL GAME
          </Button>
          <Button className="flex-1" catEars variant="danger">
            CRYPTO GAME
          </Button>
        </div>
        {/* 343 / 344 */}
        <div className="my-6 flex aspect-[343/344] w-full flex-row space-x-2">
          <div className="flex flex-1 flex-col space-y-2 text-lg font-extrabold">
            <div className="relative flex-1 overflow-hidden rounded-2xl">
              <p className="absolute left-[14px] top-[14px]">NEKO GO DOWN 100 FLOORS</p>
              <img
                src="/images/home/carousel/game-cover2.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative flex-1 overflow-hidden rounded-2xl">
              <p className="absolute left-[14px] top-[14px]">NEKO CRASH</p>
              <img
                src="/images/home/carousel/game-cover3.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col space-y-2">
            <div className="bg-colorLinear-orange relative flex-1 rounded-xl">
              <div className="absolute inset-3 flex flex-col text-start text-lg font-extrabold">
                <span>SMASH EGG</span>
                <span className="text-sm font-normal">
                  Up to <span className="font-extrabold text-primary">1000</span> kokon
                </span>
              </div>
              <img
                src="/images/home/wave.png"
                alt="wave bg"
                className="absolute inset-x-0 bottom-2 h-auto"
              />
              <img
                src="/images/home/smash-egg.png"
                alt="wave bg"
                className="absolute inset-x-0 bottom-2 z-10 h-auto"
              />
            </div>
            <Button className="h-10" variant="outline">
              MORE GAME
            </Button>
          </div>
        </div>
      </div>
      {/* new release carousel */}
      <div className="rounded-b-xl bg-black px-4 pb-4">
        <div>
          <h1 className="text-base font-extrabold">NEW RELEASE</h1>
        </div>
        <Carousel className="mt-3 aspect-[346/110] w-full">
          <CarouselContent className="-ml-0">
            {newReleaseSlides.map(slide => (
              <CarouselItem
                key={slide.id}
                className="relative flex basis-1/3 overflow-hidden pl-0 text-center"
              >
                <div className="relative pr-2">
                  <span className="absolute left-2 top-2 text-xs font-extrabold">
                    {slide.title}
                  </span>
                  <img
                    src={slide.imgSrc}
                    alt={slide.imgAlt}
                    className="h-full w-full rounded-lg object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 開發使用 */}
      <a
        className="fixed left-0 top-[50%] z-50 rounded-r-2xl border border-l-0 border-gray-600 bg-black/50 p-2 py-2 pl-1 pr-3 shadow backdrop-blur"
        href="/playground"
        rel="noopener noreferrer"
      >
        <Boxes />
      </a>
    </div>
  )
}
