import { useOutletContext } from '@remix-run/react'

import type { WalletListResponse } from '~/api/codegen/data-contracts'

type WalletsFromRespon = WalletListResponse['wallets']

type State = {
  wallets: WalletsFromRespon
}

type Action = {
  refetch: () => void
}

type ContextType = {
  state: State
  actions: Action
}

export const emptyWallets: WalletsFromRespon = []

export const useWalletProvider = (wallet: State['wallets'], refetch: Action['refetch']) => {
  const contextVal: ContextType = {
    state: {
      wallets: wallet,
    },
    actions: { refetch },
  }
  return {
    contextVal,
  }
}

export const useWalletContext = () => {
  return useOutletContext<ContextType>()
}
