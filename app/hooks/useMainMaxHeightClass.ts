import { useMemo } from 'react'
import useStore from '~/stores/useStore'

export function useMainMaxHeightClass() {
  const isHeaderVisible = useStore(state => state.isHeaderVisible)
  const isNavVisible = useStore(state => state.isNavVisible)

  const mainMaxHClass = useMemo(() => {
    const maxHeightMap = {
      true: {
        true: 'max-h-main', // header + nav
        false: 'max-h-main-without-nav', // header + no nav
      },
      false: {
        true: 'max-h-main-without-header', // no header + nav
        false: 'max-h-main-without-header-nav', // no header + no nav
      },
    }

    return maxHeightMap[`${isHeaderVisible}`][`${isNavVisible}`]
  }, [isHeaderVisible, isNavVisible])

  return mainMaxHClass
}
