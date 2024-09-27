import { useMemo } from 'react'
import { cn } from '~/lib/utils'
import useStore from '~/stores/useStore'

export function useSafePaddingClass() {
  const isHeaderVisible = useStore(state => state.isHeaderVisible)
  const isNavVisible = useStore(state => state.isNavVisible)

  const className = useMemo(
    () =>
      cn({
        'pt-header-safe': isHeaderVisible,
        'pb-nav-safe': isNavVisible,
        'pt-3 pb-3': !isHeaderVisible && !isNavVisible,
      }),
    [isHeaderVisible, isNavVisible]
  )

  return className
}
