import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useViewport } from '@telegram-apps/sdk-react'
import useStore from '~/stores/useStore'

function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverInit = {}
): [React.RefObject<T>, boolean, () => void] {
  const inTelegram = useStore(state => state.inTelegram)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef<T>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const viewportData = useViewport()
  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    setIsIntersecting(entry.isIntersecting)
  }, [])

  const initializeObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    observerRef.current = new IntersectionObserver(callback, options)
    if (targetRef.current) {
      observerRef.current.observe(targetRef.current)
    }
  }, [callback, options])

  useEffect(() => {
    initializeObserver()

    const currentTarget = targetRef.current

    // 添加一個 MutationObserver 來監視 DOM 變化
    const mutationObserver = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          initializeObserver()
          break
        }
      }
    })

    if (currentTarget) {
      mutationObserver.observe(currentTarget, {
        childList: true,
        subtree: true,
        attributes: true,
      })
    }

    // 監聽 window 的 load 事件
    const handleLoad = () => {
      initializeObserver()
    }
    window.addEventListener('load', handleLoad)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      mutationObserver.disconnect()
      window.removeEventListener('load', handleLoad)
    }
  }, [initializeObserver])

  const scrollToTop = useCallback(() => {
    if (inTelegram && viewportData) {
      targetRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // 在普通網頁環境中使用標準方法
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [inTelegram, viewportData])

  return [targetRef, isIntersecting, scrollToTop]
}

export default useIntersectionObserver
