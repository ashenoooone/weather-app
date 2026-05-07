import { createStore, useStore } from 'zustand'
import { WeatherRange } from '@/entities/weather/model/types'
import type { WeatherCity, WeatherRange as WeatherRangeValue } from '@/entities/weather/model/types'
import { persist } from 'zustand/middleware'

type State = {
  // city
  city: WeatherCity | null
  citySearch: string
  range: WeatherRangeValue
}

type Actions = {
  setCity: (city: WeatherCity) => void
  setCitySearch: (citySearch: string) => void
  setRange: (range: WeatherRangeValue) => void
}

type Store = State & Actions

const weatherPageStore = createStore<Store>()(
  persist(
    set => ({
      city: null,
      citySearch: '',
      range: WeatherRange.ONE_DAY,
      setCity: city => set({ city }),
      setCitySearch: citySearch => set({ citySearch }),
      setRange: range => set({ range }),
    }),
    {
      name: 'weather-page-store',
    },
  ),
)

export function useWeatherPageStore() {
  const city = useStore(weatherPageStore, state => state.city)
  const citySearch = useStore(weatherPageStore, state => state.citySearch)
  const range = useStore(weatherPageStore, state => state.range)

  return { city, citySearch, range }
}

export function useWeatherPageActions() {
  const setCity = useStore(weatherPageStore, state => state.setCity)
  const setCitySearch = useStore(weatherPageStore, state => state.setCitySearch)
  const setRange = useStore(weatherPageStore, state => state.setRange)

  return { setCity, setCitySearch, setRange }
}
