import { useMemo } from 'react'
import { cn } from '~/lib/utils'
import useStore from '~/stores/useStore'

export function useAppMinHeightClass() {
  const inTelegram = useStore(state => state.inTelegram)
  const isHeaderVisible = useStore(state => state.isHeaderVisible)
  const isNavVisible = useStore(state => state.isNavVisible)

  const className = useMemo(() => {
    if (inTelegram) return 'h-dvh'
    return cn({
      'min-h-with-header-nav': isHeaderVisible && isNavVisible,
      'min-h-with-header': isHeaderVisible && !isNavVisible,
      'min-h-with-nav': !isNavVisible && !isNavVisible,
      'min-h-dvh': !isHeaderVisible && !isNavVisible,
    })
  }, [inTelegram, isHeaderVisible, isNavVisible])

  return className
}
