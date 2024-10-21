import { useCallback, useMemo } from 'react'
import { useUtils } from '@telegram-apps/sdk-react'
import { useMutation } from '@tanstack/react-query'

import useStore from '~/stores/useStore'
import { apis } from '~/api/index'

export function useShare() {
  const inTelegram = useStore(state => state.inTelegram)
  const telegramConfig = useStore(state => state.telegramConfig)
  const { referralCode: userReferralCode } = useStore(state => state.userInfo)
  const utils = useUtils()

  // 邀請連結打點
  const { mutate: shareAction, isPending } = useMutation({
    mutationFn: apis.customer.customerShareCreate,
    onError: error => {
      console.error('[ERROR] shareGA error', error)
    },
  })

  const tDotMeBaseShareUrl = useMemo(() => {
    if (!telegramConfig?.botName || telegramConfig?.appName) window.location.origin
    return `https://t.me/${telegramConfig.botName}/${telegramConfig.appName}`
  }, [telegramConfig.appName, telegramConfig.botName])

  /**
   * 分享連結 (Telegram 內使用 Telegram 的分享方法)
   */
  const share = useCallback(
    async (url: string, text?: string, referralCode?: string) => {
      if (referralCode || userReferralCode) {
        await shareAction({ referralCode: referralCode || userReferralCode })
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
    [inTelegram, utils, shareAction, userReferralCode]
  )

  return {
    share,
    tDotMeBaseShareUrl,
    isLoading: isPending,
  }
}
