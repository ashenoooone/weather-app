import { createStore, useStore } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light'

type State = {
  theme: Theme
}

type Actions = {
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

type Store = State & Actions

const themeStore = createStore<Store>()(
  persist(
    set => ({
      setTheme: theme => set({ theme }),
      theme: 'light',
      toggleTheme: () => set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'theme-store',
    },
  ),
)

export function useTheme() {
  return useStore(themeStore, state => state.theme)
}

export function useThemeActions() {
  const setTheme = useStore(themeStore, state => state.setTheme)
  const toggleTheme = useStore(themeStore, state => state.toggleTheme)

  return { setTheme, toggleTheme }
}
