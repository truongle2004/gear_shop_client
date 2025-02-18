import { create } from 'zustand'

interface ShowModelState {
  show: boolean
  setShowModalRequireLogin: (show: boolean) => void
}

const useModalRequireLoginStore = create<ShowModelState>()((set) => ({
  show: false,
  setShowModalRequireLogin: (show) => set(() => ({ show }))
}))

export default useModalRequireLoginStore
