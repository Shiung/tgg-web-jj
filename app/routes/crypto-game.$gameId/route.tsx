import React, { useEffect, useRef, useCallback } from 'react'
import { useNavigate, useParams } from '@remix-run/react'
import useStore from '~/stores/useStore'
import { useGetGameUrl } from '~/hooks/api/useGetGameUrl'
import { gameList, GameId } from '~/consts/game'

import AppLoading from '~/components/app-loading'

const CasualGame: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()

  // 只請求一次的flag
  const hasRequestedRef = useRef(false)

  // 隱藏 導航欄 ＆ Header
  const setNavVisibility = useStore(state => state.setNavVisibility)
  const setHeaderVisibility = useStore(state => state.setHeaderVisibility)
  useEffect(() => {
    setNavVisibility(false)
    setHeaderVisibility(false)
    return () => {
      setNavVisibility(true)
      setHeaderVisibility(true)
    }
  }, [setNavVisibility, setHeaderVisibility])

  // 進入頁面去要遊戲連結
  const gameId: string = params.gameId || ''
  const { gameUrl, getUrl, isPending } = useGetGameUrl()

  const fetchGameUrl = useCallback(() => {
    if (gameId && gameList[gameId as unknown as GameId] && !hasRequestedRef.current) {
      getUrl(gameId, gameList[gameId as unknown as GameId].currency)
      hasRequestedRef.current = true
    }
  }, [gameId, getUrl])

  useEffect(() => {
    fetchGameUrl()
  }, [fetchGameUrl])

  // 建立事件監聽器
  const iframeRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 確保消息來自我們的遊戲 iframe
      if (event.source === iframeRef.current?.contentWindow) {
        console.log('收到來自遊戲的消息:', event.data)

        switch (event.data) {
          case 'ExitGame':
            navigate('/')
            break
          default:
            console.log('未定義消息:', event.data)
        }
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [navigate])

  return (
    <div className="container relative flex flex-1 flex-col items-center justify-center rounded-xl bg-black p-0">
      {gameUrl ? (
        <iframe
          id="apple"
          ref={iframeRef}
          src={gameUrl}
          title="Game"
          className="absolute inset-0 h-full w-full rounded-xl border-none bg-black object-contain"
        />
      ) : (
        <p className="text-center text-white">No game URL provided</p>
      )}

      {isPending && <AppLoading variant="blur" />}
    </div>
  )
}

export default CasualGame
