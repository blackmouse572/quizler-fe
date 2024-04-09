import { create } from "zustand"
type UseProgressState = {
  current: number
  total: number
  setCurrent: (current: number) => void
  setTotal: (total: number) => void
  reset: () => void
  reduce: () => void
}

export const useProgress = create<UseProgressState>((set) => ({
  current: 60,
  total: 60,
  setCurrent: (current) => set({ current }),
  setTotal: (total) => set({ total }),
  reset: () => set((state) => ({ ...state, current: state.total })),
  reduce: () =>
    set((state) => {
      if (state.current <= 0) return state
      return { current: state.current - 1 }
    }),
}))
