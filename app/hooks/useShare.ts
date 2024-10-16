import { useCallback } from 'react'
import { useUtils } from '@telegram-apps/sdk-react'
import { useMutation } from '@tanstack/react-query'

import useStore from '~/stores/useStore'
import { apis } from '~/api/index'

export function useShare() {
  const inTelegram = useStore(state => state.inTelegram)
  const { referralCode } = useStore(state => state.userInfo)
  const utils = useUtils()

  // 邀請連結打點
  const { mutate: shareGA, isPending } = useMutation({
    mutationFn: () => apis.customer.customerShareCreate({ referralCode }),
    onError: error => {
      console.error('[ERROR] shareGA error', error)
    },
  })

  const shareUrl = useCallback(
    async (url: string, text?: string) => {
      if (referralCode) {
        await shareGA()
      } else {
        console.warn('[WARN] referralCode is not found')
      }

      if (inTelegram) {
        // 在 Telegram 內使用 Telegram 的分享方法
        utils.shareURL(url, text)
      } else {
        // 在 Telegram 外使用網頁原生的分享方法
        if (navigator.share) {
          navigator
            .share({
              url: url,
              title: text || 'Share',
            })
            .catch(error => console.log('Error sharing:', error))
        } else {
          // 如果瀏覽器不支持原生分享，TODO: 實作後備方案
          console.log('Web Share API not supported')
        }
      }
    },
    [inTelegram, utils, shareGA, referralCode]
  )

  return {
    shareUrl,
    isLoading: isPending,
  }
}
