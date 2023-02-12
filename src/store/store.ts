import { create } from 'zustand'

type State = {
  count: number
  increment: () => void
  clear: () => void
}

export const useStore = create<State>((set) => ({
  annotation: '',
  increment: () => set((state) => ({ count: state.count + 1 })),
  clear: () => set((state) => ({ count: 0 })),
}))
