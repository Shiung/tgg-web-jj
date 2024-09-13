import { useEffect, useMemo } from 'react'
import { useWindowSize } from 'react-use'
import useStore from '~/stores/useStore'

/**
 * Returns the maximum width of the app based on the height of the window.
 */
export const NON_MOBILE_WIDTH = 448
export const MAX_SCREEN_WIDTH = 640
export const RATIO = 375 / 812

export function useAppMaxWidth() {
  const { width, height } = useWindowSize()
  const updateMaxWidth = useStore(state => state.updateMaxWidth)
  const setIsDesktop = useStore(state => state.setIsDesktop)

  const maxWidth = useMemo(() => {
    if (typeof window === 'undefined') return `${NON_MOBILE_WIDTH}px`
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
