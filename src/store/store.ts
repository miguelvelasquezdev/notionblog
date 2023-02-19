import { create } from 'zustand'

type State = {
  count: number
  annotation: string
  increment: () => void
  clear: () => void
}

export const useStore = create<State>((set) => ({
  count: 0,
  annotation: '',
  increment: () => set((state) => ({ count: state.count + 1 })),
  clear: () => set((state) => ({ count: 0 })),
}))
