import { useEffect, useMemo } from 'react'
import { useWindowSize } from 'react-use'
import useStore from '~/stores/useStore'

/**
 * Returns the maximum width of the app based on the height of the window.
 */
const NON_MOBILE_WIDTH = 440
const MAX_SCREEN_WIDTH = 640
const RATIO = 375 / 812

export function useAppMaxWidth() {
  const { width, height } = useWindowSize()
  const updateMaxWidth = useStore(state => state.updateMaxWidth)
  const setIsDesktop = useStore(state => state.setIsDesktop)

  const maxWidth = useMemo(() => {
    if (typeof window === 'undefined') return `${MAX_SCREEN_WIDTH}px`
    return width < MAX_SCREEN_WIDTH ? `${width}px` : `${height * RATIO}px`
  }, [width, height])

  useEffect(() => {
    updateMaxWidth(maxWidth)
  }, [maxWidth, updateMaxWidth])

  useEffect(() => {
    setIsDesktop(width >= NON_MOBILE_WIDTH)
  }, [width, setIsDesktop])

  return maxWidth
}
