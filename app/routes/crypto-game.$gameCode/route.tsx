import React, { useEffect, useRef, useCallback } from 'react'
import { useNavigate, useParams } from '@remix-run/react'
import useStore from '~/stores/useStore'
import { useGetGameUrl } from '~/hooks/api/useGame'
import AppLoading from '~/components/app-loading/index'

// 配合 useMatches 聲明需要登录才能访问
export const handle = {
  requiresAuth: true,
}

const CasualGame: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()

  // 只請求一次的flag
  const hasRequestedRef = useRef(false)

  const setNavVisibility = useStore(state => state.setNavVisibility)
  const setHeaderVisibility = useStore(state => state.setHeaderVisibility)
  const activeGameList = useStore(state => state.activeGameList)

  // 進入頁面去要遊戲連結
  const gameCode: string = params.gameCode || ''
  const { gameUrl, getUrl, isPending } = useGetGameUrl()

  const fetchGameUrl = useCallback(() => {
    if (!gameCode || hasRequestedRef.current) return
    const gameInfo = activeGameList.find(game => game.gameCode === gameCode)
    if (!gameInfo || !gameInfo.currency) return

    getUrl(`${gameInfo.id}`, gameInfo.currency)
    hasRequestedRef.current = true
  }, [activeGameList, gameCode, getUrl])

  // 隱藏 導航欄 ＆ Header
  useEffect(() => {
    setNavVisibility(false)
    setHeaderVisibility(false)
    return () => {
      setNavVisibility(true)
      setHeaderVisibility(true)
    }
  }, [setNavVisibility, setHeaderVisibility])

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
