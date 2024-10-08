import { useCallback } from 'react'
import { useUtils } from '@telegram-apps/sdk-react'
import useStore from '~/stores/useStore'

export function useShare() {
  const inTelegram = useStore(state => state.inTelegram)
  const utils = useUtils()

  const shareUrl = useCallback(
    (url: string, text?: string) => {
      if (inTelegram) {
        // 在 Telegram 內使用 Telegram 的分享方法
        utils.shareURL(url, text)
      } else {
        // 在 Telegram 外使用網頁原生的分享方法
        if (navigator.share) {
          navigator
            .share({
              url: url,
              text: text,
              title: text || 'Share',
            })
            .catch(error => console.log('Error sharing:', error))
        } else {
          // 如果瀏覽器不支持原生分享，可以提供一個後備方案
          console.log('Web Share API not supported')
          // 這裡可以添加一個自定義的分享方法，比如複製鏈接到剪貼板
        }
      }
    },
    [inTelegram, utils]
  )

  return {
    shareUrl,
  }
}
