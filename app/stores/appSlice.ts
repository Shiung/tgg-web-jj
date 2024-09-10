import { StateCreator } from 'zustand'

export interface AppSlice {
  maxWidth: string
  updateMaxWidth: (maxWidth: string) => void
}

const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = set => ({
  maxWidth: '640px',
  updateMaxWidth: maxWidth => set({ maxWidth }),
})

export default createAppSlice
