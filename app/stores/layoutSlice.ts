import { StateCreator } from 'zustand'

export interface LayoutSlice {
  maxWidth: string
  isDesktop: boolean
  isHeaderVisible: boolean
  isNavVisible: boolean
  updateMaxWidth: (maxWidth: string) => void
  setIsDesktop: (isDesktop: boolean) => void
  setHeaderVisibility: (visible: boolean) => void
  setNavVisibility: (visible: boolean) => void
}

const createLayoutSlice: StateCreator<LayoutSlice, [], [], LayoutSlice> = set => ({
  maxWidth: '640px',
  isDesktop: false,
  isHeaderVisible: true,
  isNavVisible: true,
  updateMaxWidth: maxWidth => set({ maxWidth }),
  setIsDesktop: isDesktop => set({ isDesktop }),
  setHeaderVisibility: visible => set({ isHeaderVisible: visible }),
  setNavVisibility: visible => set({ isNavVisible: visible }),
})

export default createLayoutSlice
