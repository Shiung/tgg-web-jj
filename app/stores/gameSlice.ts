import { StateCreator } from 'zustand'
import { GetActiveGamesResponse } from '~/api/codegen/data-contracts'
import { BaseGameInfo } from '~/consts/game'

export type ActiveGameInfo = GetActiveGamesResponse['list'][number] & Partial<BaseGameInfo>

export interface GameSlice {
  isActiveGameListFetching: boolean
  activeGameList: Array<ActiveGameInfo>
  setIsActiveGameListFetching: (isActiveGameListFetching: boolean) => void
  setActiveGameList: (activeGameList: Array<ActiveGameInfo>) => void
}

const createGameSlice: StateCreator<GameSlice, [], [], GameSlice> = set => ({
  isActiveGameListFetching: true,
  activeGameList: [],
  setIsActiveGameListFetching: isActiveGameListFetching => set({ isActiveGameListFetching }),
  setActiveGameList: activeGameList => set({ activeGameList }),
})

export default createGameSlice
