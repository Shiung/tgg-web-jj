import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import type { AxiosError } from 'axios'

import { apis } from '~/api/index'
import { baseGameInfos, GameCurrency, isValidGameCode } from '~/consts/game'
import { useState, useCallback, useRef, useEffect } from 'react'
import { errorToast } from '~/lib/toast'
import useStore from '~/stores/useStore'
import { ActiveGameInfo } from '~/stores/gameSlice'

interface MutationVariables {
  gameID: string
  currency: GameCurrency
}

const useGetGameUrl = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [gameUrl, setGameUrl] = useState<string | null>(null)
  const mutateRef = useRef<(variables: MutationVariables) => void>()

  const mutation = useMutation({
    mutationFn: ({ gameID, currency }: MutationVariables) =>
      apis.games.gamesEnterCreate(gameID, {
        currency: currency,
        language: 'en',
      }),
    onSuccess: data => {
      const url = data.data.gameUrl
      mutation.reset()
      if (url) {
        setGameUrl(url)
      } else {
        errorToast(t('GameURLNotFound'))
        navigate('/')
        console.error('[ERROR] gameUrl URL 不存在')
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      errorToast(error.response?.data.message || 'Unknown error')
      navigate('/')
      console.error('[ERROR] enter game occur error', error)
      setGameUrl(null)
      mutation.reset()
    },
  })

  useEffect(() => {
    mutateRef.current = mutation.mutate
  }, [mutation.mutate])

  const getUrl = useCallback((gameID: string, currency: GameCurrency) => {
    if (mutateRef.current) {
      setGameUrl(null)
      mutateRef.current({ gameID, currency })
    }
  }, [])

  return {
    gameUrl,
    getUrl,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}

const useGetActiveGameListToStore = () => {
  const { i18n } = useTranslation()
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const setIsActiveGameListFetching = useStore(state => state.setIsActiveGameListFetching)
  const setActiveGameList = useStore(state => state.setActiveGameList)

  const { data: activeGameListRaw, isLoading } = useQuery({
    queryKey: ['gamesActiveList', isLoggedIn],
    queryFn: isLoggedIn ? apis.games.gamesActiveList : apis.public.publicGamesActiveList,
  })

  useEffect(() => {
    setIsActiveGameListFetching(isLoading)
  }, [isLoading, setIsActiveGameListFetching])

  useEffect(() => {
    if (!activeGameListRaw) return

    const currentLang = i18n.language
    const activeGameList = (activeGameListRaw?.data.list || []).map(game => {
      const baseGameInfo = (isValidGameCode(game.gameCode) && baseGameInfos[game.gameCode]) || null
      const gameName =
        game.translations?.find(t => t?.language === currentLang)?.gameName ||
        baseGameInfo?.name ||
        ''

      return <ActiveGameInfo>{
        ...game,
        gameName,
        currency: baseGameInfo?.currency || '',
        fallbackImgSrc: baseGameInfo?.fallbackImgSrc || '',
      }
    })

    if (activeGameList?.length) setActiveGameList(activeGameList)
  }, [activeGameListRaw, i18n.language, setActiveGameList])
}

export { useGetGameUrl, useGetActiveGameListToStore }
