import { useState } from 'react'
import type { MetaFunction } from '@remix-run/node'
import { Link, useNavigate } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
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
import { GameCode, getGameRoute, VenueType } from '~/consts/game'
import useStore from '~/stores/useStore'
import { buildResourceImageUrl, cn } from '~/lib/utils'

import GameImg from './game-img'
import { useBanner, useBannerRedirect } from './useBanner'
import { GameEntranceSkeleton, NewReleaseCarouselContentSkeleton } from './skeleton'
import CurrencyConversionDialog from './currency-conversion-dialog'
import GameMainTenance from './gameM-mainTenance'
// import Footer from './footer'

export const meta: MetaFunction = () => {
  return [{ title: 'Katon' }, { name: 'description', content: 'Welcome to Katon!' }]
}

/* Home */
export default function Index() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const maxWidth = useStore(state => state.maxWidth)
  const activeGameList = useStore(state => state.activeGameList)
  const isActiveGameListFetching = useStore(state => state.isActiveGameListFetching)

  const { banners } = useBanner()
  const bannerRedirect = useBannerRedirect()

  // Crypto類型遊戲 先顯示貨幣轉換對話框
  const [isCurrencyConversionDialogOpen, setIsCurrencyConversionDialogOpen] = useState(false)
  const [cryptoPageLink, setCryptoPageLink] = useState<string | null>(null)
  const handleGameClick = (code: GameCode, gameType: VenueType) => {
    if (gameType === VenueType.Crypto) {
      setIsCurrencyConversionDialogOpen(true)
      setCryptoPageLink(getGameRoute(code, gameType))
    } else {
      navigate(getGameRoute(code, gameType))
    }
  }

  return (
    <div className="container px-0">
      {/* banner carousel */}
      <div className="relative aspect-[375/168] w-full rounded-t-xl bg-black">
        <div className="absolute inset-0 py-3">
          <div className="h-full w-full animate-background-wave bg-[url('/images/long-wave.png')] bg-cover bg-center bg-repeat-x" />
        </div>
        <Carousel className="w-full py-3" plugins={[Autoplay({ delay: 3000 })]}>
          <CarouselContent className="ml-0">
            {banners.map(banner => (
              <CarouselItem
                key={banner.id}
                className="relative flex aspect-[343/140] cursor-pointer justify-between"
                onClick={() => {
                  bannerRedirect(banner.redirectType || '', banner.redirectConfig || '')
                }}
              >
                <div className="absolute inset-y-3 left-4 flex w-[43%] flex-col justify-center break-words">
                  <h1 className="text-2xl font-ultra">{banner.currentLangNames?.title}</h1>
                  <p className="mt-1 text-xs font-normal text-primary">
                    {banner.currentLangNames?.subTitle}
                  </p>
                </div>
                <img
                  src={buildResourceImageUrl(banner.image)}
                  alt={banner.name}
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
        {/* TODO: 暫時隱藏 */}
        {/* <div className="flex w-full space-x-2 bg-black">
          <Button className="flex-1" catEars>
            CASUAL GAME
          </Button>
          <Button className="flex-1" catEars variant="danger">
            CRYPTO GAME
          </Button>
        </div> */}
        <div className="flex aspect-[343/344] w-full flex-row space-x-2">
          <div className="flex flex-1 flex-col text-lg font-ultra">
            {[GameCode.GoDown100Floors, GameCode.Crash].map((code, index) => {
              if (isActiveGameListFetching)
                return (
                  <GameEntranceSkeleton
                    key={`game-${code}`}
                    className={index !== 0 ? 'mt-2' : ''}
                  />
                )

              const currentGameInfo = activeGameList.find(game => game.gameCode === code)
              if (!currentGameInfo) return null

              return (
                <ProtectedLink
                  key={`game-${code}`}
                  prefetch="viewport"
                  onClick={() => {
                    handleGameClick(code, currentGameInfo.gameType)
                  }}
                  to={getGameRoute(code, currentGameInfo.gameType)}
                  className={cn(
                    'relative flex-1 overflow-hidden rounded-2xl',
                    index !== 0 && 'mt-2'
                  )}
                >
                  <p className="absolute inset-x-3 top-[14px]">{currentGameInfo.gameName}</p>
                  <GameImg
                    srcList={[
                      buildResourceImageUrl(currentGameInfo.gameLogo),
                      currentGameInfo.fallbackImgSrc || '',
                    ]}
                    alt={currentGameInfo.gameName}
                    className="h-full w-full object-cover"
                  />
                  <GameMainTenance
                    isGameMaintain={currentGameInfo.isGameMaintain}
                    maintainStartAt={currentGameInfo.maintainStartAt}
                    maintainEndAt={currentGameInfo.maintainEndAt}
                  />
                </ProtectedLink>
              )
            })}
          </div>

          <div className="flex flex-1 flex-col space-y-2">
            {/* Smash Egg */}
            <ProtectedLink
              prefetch="viewport"
              to="/smash-egg"
              className="relative flex-1 rounded-xl bg-colorLinear-orange"
            >
              <div className="absolute inset-3 flex flex-col text-start text-lg font-ultra">
                <span>{t('SmashEgg')}</span>
                <span className="text-sm font-normal">
                  {t('UpTo')} <span className="font-ultra text-primary">1000</span> KATON
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
            {/* TODO: 暫時隱藏 */}
            {/* <Button className="h-10" variant="outline">
              MORE GAME
            </Button> */}
          </div>
        </div>
      </div>
      {/* New release carousel */}
      <div className="bg-black px-4 pb-4">
        <Carousel className="aspect-[346/144] w-full">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-base font-ultra">{t('NewRelease')}</h1>
            {activeGameList.length > 3 && (
              <div className="relative flex items-center space-x-[2px]">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            )}
          </div>
          {isActiveGameListFetching ? (
            <NewReleaseCarouselContentSkeleton />
          ) : (
            <CarouselContent className="-ml-0">
              {activeGameList.map(game => (
                <CarouselItem
                  key={`carousel-game-${game.gameCode}`}
                  className="relative flex basis-1/3 overflow-hidden pl-0 text-center"
                >
                  <ProtectedLink
                    className="relative pr-2"
                    prefetch="viewport"
                    onClick={() => {
                      handleGameClick(game.gameCode as GameCode, game.gameType)
                    }}
                    to={getGameRoute(game.gameCode as GameCode, game.gameType)}
                  >
                    <span className="absolute inset-x-0 top-2 z-10 mx-auto min-h-8 pl-2 pr-4 text-center text-sm font-ultra">
                      {game.gameName}
                    </span>
                    <GameImg
                      srcList={[buildResourceImageUrl(game.gameLogo), game.fallbackImgSrc || '']}
                      alt={game.gameName}
                      className="h-full w-full rounded-lg object-contain"
                    />
                    <GameMainTenance
                      className="text-sm"
                      isGameMaintain={game.isGameMaintain}
                      maintainStartAt={game.maintainStartAt}
                      maintainEndAt={game.maintainEndAt}
                    />
                  </ProtectedLink>
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
        </Carousel>
      </div>
      {/* footer 暫停開發隱藏 */}
      {/* <Footer /> */}

      {/* 紅包 */}
      <Link
        prefetch="viewport"
        className="fixed bottom-24 z-50"
        style={{ left: `calc((100vw - ${maxWidth}) / 2)` }}
        to="/lucky-money/list"
        rel="noopener noreferrer"
      >
        <SvgEnterByFloating imgUrl="/images/lucky-money/lucky-money.png" />
      </Link>

      <CurrencyConversionDialog
        isOpen={isCurrencyConversionDialogOpen}
        cryptoPageLink={cryptoPageLink}
        onClose={() => {
          setIsCurrencyConversionDialogOpen(false)
        }}
      />
    </div>
  )
}
