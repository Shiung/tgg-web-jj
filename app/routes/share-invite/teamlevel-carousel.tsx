import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import { cn } from '~/lib/utils'
import { useTranslation } from 'react-i18next'

import ArrowLeftIcon from '~/icons/arrow-left.svg?react'
import ArrowRightIcon from '~/icons/arrow-right.svg?react'

interface TeamLevelCarouselProps {
  images: string[]
  teamLevel: number
  onTeamLevelChange: (level: number) => void
}

const TeamLevelCarousel: React.FC<TeamLevelCarouselProps> = ({
  images,
  teamLevel,
  onTeamLevelChange,
}) => {
  const { t } = useTranslation()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      axis: 'y',
    },
    [Fade()]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [animatedStars, setAnimatedStars] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedStars(prev => (prev < selectedIndex + 1 ? prev + 1 : prev))
    }, 200)
    onTeamLevelChange(selectedIndex + 1)
    return () => clearInterval(timer)
  }, [selectedIndex, onTeamLevelChange])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
    emblaApi.on('select', onSelect)
    onSelect() // 初始化选中状态

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <div className="relative mx-auto w-full rounded-lg">
      <div className="mb-2 mt-5 flex items-center justify-center text-center">
        <div className="rounded-full bg-gradient-to-b from-[#FFF200] to-[#FFF2004D] p-[1px]">
          <span className="relative flex items-center rounded-full bg-black px-2 py-1 text-sm font-ultra text-primary">
            <span className="absolute left-1/2 top-[-13px] flex w-40 -translate-x-1/2 items-center justify-center">
              {Array.from({ length: selectedIndex + 1 }).map((_, index) => (
                <img
                  key={index}
                  className={cn(
                    'h-4 w-4',
                    index < animatedStars ? 'animate-fall-down' : 'opacity-0'
                  )}
                  src="/images/3D-star.png"
                  alt="3D-star"
                />
              ))}
            </span>
            <span className="">{t('StarTeam', { count: selectedIndex + 1 })}</span>
          </span>
        </div>
      </div>

      <div className="relative mx-auto mb-4 h-[120px]">
        <div className="mx-auto h-full w-[240px] overflow-hidden" ref={emblaRef}>
          <div className="flex h-full flex-col">
            {images.map((image, index) => (
              <div key={index} className="min-h-0 flex-[0_0_100%]">
                <img src={image} alt={`Slide ${index}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ArrowLeftIcon className="h-6 w-6 cursor-pointer text-primary" />
        </button>
        <button
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ArrowRightIcon className="h-6 w-6 cursor-pointer text-primary" />
        </button>
      </div>
      <div className="mb-2 flex w-full items-center justify-center">
        {images.map((_, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div
                className={cn(
                  'mx-1 h-[1px] w-6 border-b border-dashed',
                  index < teamLevel ? 'border-[#FFF20080]' : 'border-black'
                )}
              />
            )}
            <button
              className={cn(
                'relative z-10 h-3 w-3 rounded-full transition-colors',
                selectedIndex === index
                  ? 'ring-2 ring-yellow-200 ring-offset-2 ring-offset-[#007E36]'
                  : '',
                index + 1 < teamLevel ? 'bg-[#FFF20080]' : 'bg-black',
                index + 1 === teamLevel ? 'bg-primary' : ''
              )}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default TeamLevelCarousel
