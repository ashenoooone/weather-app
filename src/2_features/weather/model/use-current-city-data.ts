import { weatherQueryOptions } from '@/entities/weather/model/query-options'
import { useQuery } from '@tanstack/react-query'
import { useWeatherPageStore } from './weather-page.store'

export function useCurrentCityData() {
  const { city, range } = useWeatherPageStore()

  const query = useQuery(weatherQueryOptions({ city, range }))

  return {
    data: query.data,
    isError: query.isError,
    isLoading: query.isLoading,
  }
}
