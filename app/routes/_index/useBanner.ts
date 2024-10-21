import { useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUtils } from '@telegram-apps/sdk-react'
import { useTranslation } from 'react-i18next'
import { apis } from '~/api'
import useStore from '~/stores/useStore'
import { useNavigate } from '@remix-run/react'
import { baseGameInfos, getGameRoute, isValidGameCode } from '~/consts/game'

const useBanner = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const { i18n } = useTranslation()

  const { data, isLoading } = useQuery({
    queryKey: ['bannerHomeCarouselList'],
    queryFn: isLoggedIn
      ? apis.banner.bannerHomeCarouselList
      : apis.public.publicBannerHomeCarouselList,
  })

  return useMemo(() => {
    const currentLang = i18n.language
    const banners = (data?.data?.list || [])
      .map(banner => ({
        ...banner,
        currentLangNames: banner?.language?.find(t => t?.code === currentLang),
      }))
      .filter(Boolean)

    return { banners, isLoading }
  }, [data, isLoading, i18n.language])
}

enum RedirectTypeEnum {
  NONE = 'NONE',
  URL = 'URL',
  GAME = 'GAME',
  RANK = 'RANK',
  TASK = 'TASK',
  LEAGUE = 'LEAGUE',
  WALLET = 'WALLET',
}

const useBannerRedirect = () => {
  const navigate = useNavigate()
  const utils = useUtils()
  const inTelegram = useStore(state => state.inTelegram)

  return useCallback(
    (redirectType: string, redirectConfig: string) => {
      switch (redirectType) {
        case RedirectTypeEnum.NONE:
          // 无操作
          break
        case RedirectTypeEnum.URL:
          // 跳轉到外部 URL
          if (redirectConfig) {
            if (inTelegram) {
              utils.openLink(redirectConfig)
            } else {
              window.open(redirectConfig, '_blank')
            }
          }
          break
        case RedirectTypeEnum.GAME:
          // 跳转到游戏介面，根据 gameCode
          if (redirectConfig) {
            const gameCode = redirectConfig
            if (isValidGameCode(gameCode)) {
              const currentGameInfo = baseGameInfos[gameCode]
              const to = getGameRoute(gameCode, currentGameInfo.gameType)
              if (to) navigate(to)
            }
          }
          console.error('Invalid gameCode:', redirectConfig)
          break
        case RedirectTypeEnum.RANK:
          // 跳转到排行榜
          if (redirectConfig === 'allianceRanking') {
            // 联盟排行榜
            navigate('/rank/share')
          } else if (redirectConfig === 'bcRanking') {
            //BC排行榜
            navigate('/rank/crypto')
          }
          break
        case RedirectTypeEnum.TASK:
          // 跳转到任务介面，
          switch (redirectConfig) {
            case 'taskEveryDay': // 每日任务
              navigate('/task/subtask?type=dailyList')
              break
            case 'taskOneTime': // 单次任务
              navigate('/task/subtask?type=oneTimeList')
              break
            case 'taskSpecial': // 特殊任务
              navigate('/task/subtask?type=specialList')
              break
            default:
              break
          }
          break
        case RedirectTypeEnum.LEAGUE:
          navigate('/share-invite')
          break
        case RedirectTypeEnum.WALLET:
          // 跳转到钱包，
          switch (redirectConfig) {
            case 'deposit': // 充值
              navigate('/wallet/deposit')
              break
            case 'withdrawCash': // 提现
              navigate('/wallet/withdraw')
              break
            case 'platformCurrencyTrade': // 平台币交易
              navigate('/wallet/swap')
              break
            default:
              break
          }
          break
        default:
          break
      }
    },
    [inTelegram, navigate, utils]
  )
}

export { useBanner, useBannerRedirect }
