import { useEffect, useMemo } from 'react'
import { useWindowSize } from 'react-use'
import useStore from '~/stores/useStore'

/**
 * Returns the maximum width of the app based on the height of the window.
 */
const MIN_SCREEN_WIDTH = 640
const RATIO = 375 / 812
export function useAppMaxWidth() {
  const { width, height } = useWindowSize()
  const updateMaxWidth = useStore(state => state.updateMaxWidth)

  const maxWidth = useMemo(() => {
    if (width < MIN_SCREEN_WIDTH) return width
    return height * RATIO
  }, [width, height])

  useEffect(() => {
    updateMaxWidth(maxWidth)
  }, [maxWidth, updateMaxWidth])

  return maxWidth
}
