import { useQuery } from '@tanstack/react-query'
import { useWeatherPageStore } from './weather-page.store'
import { weatherQueryOptions } from '@/entities/weather/model/query-options'
import { WeatherRange } from '@/entities/weather/model/types'

export function useCurrentCityData() {
  const { city } = useWeatherPageStore()

  const query = useQuery(weatherQueryOptions({ city, range: WeatherRange.ONE_DAY }))

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}
