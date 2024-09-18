import React, { useCallback, useEffect, useRef } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import classes from './embla.module.scss'

const CIRCLE_DEGREES = 360
const WHEEL_ITEM_SIZE = 30
const WHEEL_ITEM_COUNT = 18
const WHEEL_ITEMS_IN_VIEW = 3

export const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT
export const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW
export const WHEEL_RADIUS = Math.round(WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT))

const isInView = (wheelLocation: number, slidePosition: number): boolean =>
  Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES

const setSlideStyles = (
  emblaApi: EmblaCarouselType,
  index: number,
  loop: boolean,
  slideCount: number,
  totalRadius: number
): void => {
  const slideNode = emblaApi.slideNodes()[index]
  const wheelLocation = emblaApi.scrollProgress() * totalRadius
  const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius
  const positionLoopStart = positionDefault + totalRadius
  const positionLoopEnd = positionDefault - totalRadius

  let inView = false
  let angle = index * -WHEEL_ITEM_RADIUS

  if (isInView(wheelLocation, positionDefault)) {
    inView = true
  }

  if (loop && isInView(wheelLocation, positionLoopEnd)) {
    inView = true
    angle = -CIRCLE_DEGREES + (slideCount - index) * WHEEL_ITEM_RADIUS
  }

  if (loop && isInView(wheelLocation, positionLoopStart)) {
    inView = true
    angle = -(totalRadius % CIRCLE_DEGREES) - index * WHEEL_ITEM_RADIUS
  }

  if (inView) {
    slideNode.style.opacity = '1'
    slideNode.style.transform = `translateY(-${
      index * 100
    }%) rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`
  } else {
    slideNode.style.opacity = '0'
    slideNode.style.transform = 'none'
  }
}

export const setContainerStyles = (emblaApi: EmblaCarouselType, wheelRotation: number): void => {
  emblaApi.containerNode().style.transform = `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`
}

type PropType = {
  loop?: boolean
  label: string
  slides: string[]
  perspective: 'left' | 'right'
  onChange?: (value: string) => void
}

const IosPickerItem: React.FC<PropType> = ({
  slides,
  perspective,
  label,
  loop = true,
  onChange,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    axis: 'y',
    dragFree: true,
    containScroll: false,
    watchSlides: false,
  })
  const rootNodeRef = useRef<HTMLDivElement>(null)
  const slideCount = slides.length
  const totalRadius = slideCount * WHEEL_ITEM_RADIUS
  const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS
  // const slides = Array.from(Array(slideCount).keys())

  const inactivateEmblaTransform = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return
    const { translate, slideLooper } = emblaApi.internalEngine()
    translate.clear()
    translate.toggleActive(false)
    slideLooper.loopPoints.forEach(({ translate }) => {
      translate.clear()
      translate.toggleActive(false)
    })
  }, [])

  const rotateWheel = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset
      const wheelRotation = rotation * emblaApi.scrollProgress()
      setContainerStyles(emblaApi, wheelRotation)
      emblaApi.slideNodes().forEach((_, index) => {
        setSlideStyles(emblaApi, index, loop, slideCount, totalRadius)
      })

      const selectedValue = `${slides[emblaApi.selectedScrollSnap()]}`
      if (onChange) {
        onChange(selectedValue) // 触发 onChange 回调
      }
    },
    [slideCount, rotationOffset, slides, onChange, loop, totalRadius]
  )

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('pointerUp', emblaApi => {
      const { scrollTo, target, location } = emblaApi.internalEngine()
      const diffToTarget = target.get() - location.get()
      const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1
      const distance = diffToTarget * factor
      scrollTo.distance(distance, true)
    })

    emblaApi.on('scroll', rotateWheel)

    emblaApi.on('reInit', emblaApi => {
      inactivateEmblaTransform(emblaApi)
      rotateWheel(emblaApi)
    })

    inactivateEmblaTransform(emblaApi)
    rotateWheel(emblaApi)
  }, [emblaApi, inactivateEmblaTransform, rotateWheel])

  return (
    <div className={classes['embla__ios-picker']}>
      <div className={classes['embla__ios-picker__scene']} ref={rootNodeRef}>
        <div
          className={`${classes['embla__ios-picker__viewport']} ${classes[`embla__ios-picker__viewport--perspective-${perspective}`]}`}
          ref={emblaRef}
        >
          <div className={classes['embla__ios-picker__container']}>
            {slides.map((slide, index) => (
              <div key={index} className={classes['embla__ios-picker__slide']}>
                {slide}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className={classes['embla__ios-picker__label']}>{label}</div> */}
    </div>
  )
}

export default IosPickerItem
