import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from '@remix-run/react'
import useStore from '~/stores/useStore'

import BuyEnergyDialog from './buy-energy-dialog'

const GameRoute: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const src = params.get('src')

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

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isBuyEnergyDialogOpen, setIsBuyEnergyDialogOpen] = useState(false)
  const handleCloseBuyEnergyDialog = () => {
    setIsBuyEnergyDialogOpen(false)
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 確保消息來自我們的遊戲 iframe
      if (event.source === iframeRef.current?.contentWindow) {
        console.log('收到來自遊戲的消息:', event.data)

        switch (event.data) {
          case 'NoEnough':
            setIsBuyEnergyDialogOpen(true)
            break
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
  }, [navigate, setIsBuyEnergyDialogOpen])

  return (
    <div className="container flex w-full flex-1 items-center justify-center rounded-xl bg-red-300 p-0">
      {src ? (
        <iframe
          id="apple"
          ref={iframeRef}
          src={src}
          title="遊戲"
          className="h-dvh w-full rounded-xl border-none object-contain"
          style={{ backgroundColor: 'black' }}
        />
      ) : (
        <p className="text-center text-white">沒有提供遊戲 URL</p>
      )}

      <BuyEnergyDialog isOpen={isBuyEnergyDialogOpen} onClose={handleCloseBuyEnergyDialog} />
    </div>
  )
}

export default GameRoute
