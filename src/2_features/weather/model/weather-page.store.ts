import { createStore, useStore } from 'zustand'
import type { WeatherCity } from '@/entities/weather/model/types'

type State = {
  // city
  city: WeatherCity | null
  citySearch: string
}

type Actions = {
  setCity: (city: WeatherCity) => void
  setCitySearch: (citySearch: string) => void
}

type Store = State & Actions

const weatherPageStore = createStore<Store>(set => ({
  city: null,
  citySearch: '',
  setCity: city => set({ city }),
  setCitySearch: citySearch => set({ citySearch }),
}))

export function useWeatherPageStore() {
  const city = useStore(weatherPageStore, state => state.city)
  const citySearch = useStore(weatherPageStore, state => state.citySearch)
  return { city, citySearch }
}

export function useWeatherPageActions() {
  const setCity = useStore(weatherPageStore, state => state.setCity)
  const setCitySearch = useStore(weatherPageStore, state => state.setCitySearch)
  return { setCity, setCitySearch }
}
