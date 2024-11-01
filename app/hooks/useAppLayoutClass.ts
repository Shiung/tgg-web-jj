import { useMemo } from 'react'
import { cn } from '~/lib/utils'
import useStore from '~/stores/useStore'

export function useAppLayoutClass() {
  const { inTelegram, isHeaderVisible, isNavVisible } = useStore(state => ({
    inTelegram: state.inTelegram,
    isHeaderVisible: state.isHeaderVisible,
    isNavVisible: state.isNavVisible,
  }))

  return useMemo(() => {
    let heightClass
    if (inTelegram) {
      if (isHeaderVisible && isNavVisible) {
        heightClass =
          'h-[calc(100vh_-_var(--top-header-safe-padding)_-_var(--bottom-nav-safe-padding))] mt-header-safe mb-nav-safe'
      } else if (isHeaderVisible) {
        heightClass = 'h-[calc(100vh_-_var(--top-header-safe-padding))] mt-header-safe'
      } else if (isNavVisible) {
        heightClass = 'h-[calc(100vh_-_var(--bottom-nav-safe-padding))] mb-nav-safe'
      } else {
        heightClass = 'h-[calc(100vh_-_24px)] my-3'
      }
    } else {
      heightClass = 'min-h-dvh'
    }

    const paddingClass =
      !inTelegram &&
      cn({
        'pt-header-safe pb-3': isHeaderVisible,
        'pb-nav-safe': isNavVisible,
        'pt-3 pb-3': !isHeaderVisible && !isNavVisible,
      })

    return cn(heightClass, paddingClass)
  }, [inTelegram, isHeaderVisible, isNavVisible])
}
