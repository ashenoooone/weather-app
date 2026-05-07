import { useQuery } from '@tanstack/react-query'
import { useWeatherPageStore } from './weather-page.store'
import { weatherQueryOptions } from '@/entities/weather/model/query-options'

export function useCurrentCityData() {
  const { city, range } = useWeatherPageStore()

  const query = useQuery(weatherQueryOptions({ city, range }))

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}
