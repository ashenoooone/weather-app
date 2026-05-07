import { keepPreviousData, queryOptions } from '@tanstack/react-query'
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
  FORECAST: (city: WeatherCity | null | undefined, range: WeatherRange) => ['weather', 'forecast', city?.id ?? 'empty', range],
}

export function citySearchQueryOptions(params: SearchWeatherCitiesParams) {
  return queryOptions({
    enabled: params.search.trim().length >= 2,
    queryFn: ({ signal }) => searchWeatherCities({ ...params, signal }),
    queryKey: WEATHER_QUERY_KEYS.CITIES(params),
    staleTime: seconds(30),
  })
}

type WeatherQueryOptionsParams = {
  city?: WeatherCity | null
  range: WeatherRange
}

export function weatherQueryOptions(params: WeatherQueryOptionsParams) {
  const { city, range } = params
  return queryOptions({
    queryFn: () => getWeather({ city: city!, range }),
    queryKey: WEATHER_QUERY_KEYS.FORECAST(city, range),
    enabled: !!city,
    staleTime: seconds(0),
    placeholderData: keepPreviousData,
  })
}
