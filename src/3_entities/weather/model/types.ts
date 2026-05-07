export type WeatherCity = {
  id: number
  name: string
  country?: string
  admin1?: string
  latitude: number
  longitude: number
  timezone?: string
}

const WEATHER_RANGE = {
  ONE_DAY: 1,
  THREE_DAYS: 3,
  SEVEN_DAYS: 7,
  FOURTEEN_DAYS: 14,
} as const

export { WEATHER_RANGE as WeatherRange }

export type WeatherRange = typeof WEATHER_RANGE[keyof typeof WEATHER_RANGE]

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
