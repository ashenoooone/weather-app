export type WeatherCity = {
  id: number
  name: string
  country?: string
  admin1?: string
  latitude: number
  longitude: number
  timezone?: string
}

export type WeatherRange = 1 | 3 | 7 | 14

export type OpenMeteoGeocodingResponse = {
  results?: WeatherCity[]
}

export type SearchWeatherCitiesParams = {
  search: string
  page?: number
  perPage?: number
  signal?: AbortSignal
}

export type OpenMeteoForecastResponse = {
  hourly?: {
    time?: string[]
    temperature_2m?: number[]
    relative_humidity_2m?: number[]
  }
}

export type GetWeatherParams = {
  city: WeatherCity
  range: WeatherRange
}
