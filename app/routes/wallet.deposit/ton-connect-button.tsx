import { useEffect, useState } from 'react'
import { useTonConnectUI, useTonConnectModal } from '@tonconnect/ui-react'
import { Button } from '~/components/ui/button'

export default function TonConnectButton() {
  const [tonConnectUI] = useTonConnectUI()
  // const { state, open, close } = useTonConnectModal()
  const [walletConnected, setWalletConnected] = useState(false)

  const handleConnect = async () => {
    console.error('handleConnect:', tonConnectUI)
    try {
      console.log('Modal 準備打開')
      await tonConnectUI.openModal()
      console.log('Modal 已打開')
    } catch (error) {
      console.error('連結錢包時發生錯誤:', error)
    }
  }

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange(wallet => {
      if (wallet) {
        setWalletConnected(true)
        console.log('連接成功:', wallet)
      } else {
        setWalletConnected(false)
        console.error('連接失敗')
      }
    })

    return () => unsubscribe()
  }, [tonConnectUI])

  return (
    <>
      <Button onClick={handleConnect}>Connect Wallet</Button>
    </>
  )
}
