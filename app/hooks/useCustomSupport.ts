import { useCallback } from 'react'
import { useUtils } from '@telegram-apps/sdk-react'
import useStore from '~/stores/useStore'

const supportUrl = 'https://t.me/katon_cs'

export function useCustomSupport() {
  const inTelegram = useStore(state => state.inTelegram)
  const utils = useUtils()

  /**
   * 分享連結 (Telegram 內使用 Telegram 的分享方法)
   */
  const handleCustomSupport = useCallback(() => {
    if (inTelegram) {
      utils.openTelegramLink(supportUrl)
    } else {
      window.open(supportUrl, '_blank', 'noreferrer')
    }
  }, [inTelegram, utils])

  return {
    handleCustomSupport,
  }
}
