import { StateCreator } from 'zustand'

export interface AppSlice {
  maxWidth: number
  updateMaxWidth: (maxWidth: number) => void
}

const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = set => ({
  maxWidth: 375,
  updateMaxWidth: maxWidth => set({ maxWidth }),
})

export default createAppSlice
