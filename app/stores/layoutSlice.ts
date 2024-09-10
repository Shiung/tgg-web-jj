import { StateCreator } from 'zustand'

export interface LayoutSlice {
  maxWidth: string
  isNavVisible: boolean
  updateMaxWidth: (maxWidth: string) => void
  setNavVisibility: (visible: boolean) => void
}

const createLayoutSlice: StateCreator<LayoutSlice, [], [], LayoutSlice> = set => ({
  maxWidth: '640px',
  isNavVisible: true,
  updateMaxWidth: maxWidth => set({ maxWidth }),
  setNavVisibility: visible => set({ isNavVisible: visible }),
})

export default createLayoutSlice
