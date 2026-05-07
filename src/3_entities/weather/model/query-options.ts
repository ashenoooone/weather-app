import { queryOptions } from '@tanstack/react-query'
import { getWeather, searchWeatherCities } from './api'
import type { SearchWeatherCitiesParams, WeatherCity, WeatherRange } from './types'
import { seconds } from '@/shared/lib/time'

export const WEATHER_QUERY_KEYS = {
  CITIES: ({ page = 1, perPage = 5, search }: SearchWeatherCitiesParams) => [
    'weather',
    'cities',
    search,
    page,
    perPage,
  ],
  FORECAST: (city: WeatherCity, range: WeatherRange) => ['weather', 'forecast', city.id, range],
}

export function citySearchQueryOptions(params: SearchWeatherCitiesParams) {
  return queryOptions({
    enabled: params.search.trim().length >= 2,
    queryFn: ({ signal }) => searchWeatherCities({ ...params, signal }),
    queryKey: WEATHER_QUERY_KEYS.CITIES(params),
    staleTime: seconds(30),
  })
}

export function weatherQueryOptions(city: WeatherCity, range: WeatherRange) {
  return queryOptions({
    queryFn: () => getWeather({ city, range }),
    queryKey: WEATHER_QUERY_KEYS.FORECAST(city, range),
    staleTime: seconds(0),
  })
}
