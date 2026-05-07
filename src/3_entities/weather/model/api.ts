import { $instance } from '@/shared/api/instance'
import { config } from '@/shared/model/config'
import type {
  GetWeatherParams,
  OpenMeteoForecastResponse,
  OpenMeteoGeocodingResponse,
  SearchWeatherCitiesParams,
} from './types'

export async function searchWeatherCities({ page = 1, perPage = 5, search, signal }: SearchWeatherCitiesParams) {
  const count = page * perPage
  const { data } = await $instance.get<OpenMeteoGeocodingResponse>(config.OPEN_METEO_GEOCODING_API_URL, {
    signal,
    params: {
      count,
      format: 'json',
      language: 'ru',
      name: search,
    },
  })

  const startIndex = (page - 1) * perPage

  return (data.results ?? []).slice(startIndex, startIndex + perPage)
}

export async function getWeather({ city, range }: GetWeatherParams) {
  return $instance.get<OpenMeteoForecastResponse>(config.OPEN_METEO_FORECAST_API_URL, {
    params: {
      forecast_days: range,
      hourly: ['temperature_2m', 'relative_humidity_2m'].join(','),
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: 'auto',
    },
  })
}
