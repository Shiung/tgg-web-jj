import { useMutation } from '@tanstack/react-query'
import { apis } from '~/api/index'
import { useNavigate } from '@remix-run/react'
import { type GameCurrency } from '~/consts/game'
import { useState, useCallback, useRef, useEffect } from 'react'
import { useToast } from '~/hooks/use-toast'
import { AxiosError } from 'axios'

interface MutationVariables {
  gameID: string
  currency: GameCurrency
}

const useGetGameUrl = () => {
  const navigate = useNavigate()
  const [gameUrl, setGameUrl] = useState<string | null>(null)
  const { toast } = useToast()
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
        toast({
          title: '未找到遊戲 URL',
          variant: 'error',
        })
        navigate('/')
        console.error('[ERROR] gameUrl URL 不存在')
      }
    },
    onError: (error: AxiosError<any>) => {
      toast({
        title: error.response?.data?.message || 'Unknown error',
        variant: 'error',
      })
      navigate('/')
      console.error('[ERROR] gamesEnterCreate 失敗 ', error)
      setGameUrl(null)
      mutation.reset()
    },
  })

  useEffect(() => {
    mutateRef.current = mutation.mutate
  }, [mutation.mutate])

  const getUrl = useCallback((gameID: string, currency: GameCurrency): void => {
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

export { useGetGameUrl }
