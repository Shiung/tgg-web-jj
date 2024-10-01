import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { Boxes } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
// import { Button } from '~/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel'
import SvgEnterByFloating from '~/components/color-icons/enter-by-floating'
import ProtectedLink from '~/components/protected-link'
import { gameList, GameId, getGameRoute } from '~/consts/game'

import Footer from './footer'

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

/* Home */
export default function Index() {
  return (
    <div className="container px-0">
      {/* banner carousel */}
      <div className="relative aspect-[375/168] w-full rounded-t-xl bg-black">
        <div className="absolute inset-0 py-3">
          <div className="h-full w-full animate-background-wave bg-[url('/images/long-wave.png')] bg-cover bg-center bg-repeat-x" />
        </div>
        <Carousel className="w-full px-4 py-3" plugins={[Autoplay({ delay: 3000 })]}>
          <CarouselContent className="ml-0">
            {bannerSlides.map(slide => (
              <CarouselItem
                key={slide.id}
                className="relative flex aspect-[343/140] justify-between"
              >
                <div className="absolute inset-y-3 left-4 flex w-[43%] flex-col justify-center break-words">
                  <h1 className="text-2xl font-ultra">{slide.title}</h1>
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
          <CarouselDots />
        </Carousel>
      </div>
      {/* Game entrance */}
      <div className="flex flex-col space-y-6 bg-black px-4 pb-6 pt-4">
        {/* <div className="flex w-full space-x-2 bg-black">
          <Button className="flex-1" catEars>
            CASUAL GAME
          </Button>
          <Button className="flex-1" catEars variant="danger">
            CRYPTO GAME
          </Button>
        </div> */}
        <div className="flex aspect-[343/344] w-full flex-row space-x-2">
          <div className="flex flex-1 flex-col space-y-2 text-lg font-ultra">
            {[GameId.GoDown100Floors, GameId.Crash].map(id => {
              return (
                <ProtectedLink
                  key={`game-${id}`}
                  prefetch="viewport"
                  to={getGameRoute(id, gameList[id].venueType)}
                  className="relative flex-1 overflow-hidden rounded-2xl"
                >
                  <p className="absolute inset-x-3 top-[14px]">{gameList[id].name.toUpperCase()}</p>
                  <img
                    src={gameList[id].imgSrc}
                    alt={gameList[id].imgAlt}
                    className="h-full w-full object-cover"
                  />
                </ProtectedLink>
              )
            })}
          </div>
          <div className="flex flex-1 flex-col space-y-2">
            <ProtectedLink
              prefetch="viewport"
              to="/smash-egg"
              className="relative flex-1 rounded-xl bg-colorLinear-orange"
            >
              <div className="absolute inset-3 flex flex-col text-start text-lg font-ultra">
                <span>SMASH EGG</span>
                <span className="text-sm font-normal">
                  Up to <span className="font-ultra text-primary">1000</span> kokon
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
            </ProtectedLink>
            {/* <Button className="h-10" variant="outline">
              MORE GAME
            </Button> */}
          </div>
        </div>
      </div>
      {/* new release carousel */}
      <div className="bg-black px-4 pb-6">
        <Carousel className="aspect-[346/144] w-full">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-base font-ultra">NEW RELEASE</h1>
            <div className="relative flex items-center space-x-[2px]">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
          <CarouselContent className="-ml-0">
            {Object.entries(gameList).map(([id, game]) => (
              <CarouselItem
                key={`carousel-game-${id}`}
                className="relative flex basis-1/3 overflow-hidden pl-0 text-center"
              >
                <ProtectedLink
                  className="relative pr-2"
                  prefetch="viewport"
                  to={getGameRoute(id as unknown as GameId, game.venueType)}
                >
                  <span className="absolute inset-x-0 top-2 mx-auto min-h-8 pl-2 pr-4 text-center text-sm font-ultra">
                    {game.name.toUpperCase()}
                  </span>
                  <img
                    src={game.imgSrc}
                    alt={game.imgAlt}
                    className="h-full w-full rounded-lg object-contain"
                  />
                </ProtectedLink>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      {/* footer */}
      <Footer />
      {/* 開發使用 */}
      {/* playground */}
      <a
        className="fixed left-0 top-[45%] z-50 rounded-r-2xl border border-l-0 border-gray-600 bg-black/50 p-2 py-2 pl-1 pr-3 shadow backdrop-blur"
        href="/playground"
        rel="noopener noreferrer"
      >
        <Boxes />
      </a>

      {/* 紅包使用 */}
      <Link
        prefetch="viewport"
        className="fixed bottom-24 left-0 z-50"
        to="/lucky-money/list"
        rel="noopener noreferrer"
      >
        <SvgEnterByFloating imgurl="/images/lucky-money/lucky-money.png" />
      </Link>
    </div>
  )
}
