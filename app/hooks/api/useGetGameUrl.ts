import { useMutation } from '@tanstack/react-query'
import { apis } from '~/api/index'
import { useNavigate } from '@remix-run/react'
import { useToast } from '~/hooks/use-toast'
import { AxiosError } from 'axios'

// NOTICE: 1: bc, 2: bc, 3: 消消樂
const mockGameID = '3'

const useGetGameUrl = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: (gameID: string = mockGameID) =>
      apis.games.gamesEnterCreate(gameID, {
        currency: 'K9',
        language: 'en',
      }),
    onSuccess: (data: { data: { gameUrl: string } }) => {
      const gameUrl = data.data.gameUrl
      if (gameUrl) {
        // TODO: casual-game 與 crypto-game
        const encodedGameUrl = encodeURIComponent(gameUrl)
        navigate(`/casual-game?src=${encodedGameUrl}`)
      } else {
        toast({
          title: 'game url not found',
          variant: 'error',
        })
        console.error('[ERROR] gameUrl URL 不存在')
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: error.response?.data.message || '未知錯誤',
        variant: 'error',
      })
      console.error('[ERROR] gamesEnterCreate failed ', error)
    },
  })

  return mutation
}

export { useGetGameUrl }
