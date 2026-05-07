export const config = {
  ...import.meta.env,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001',
  BACKEND_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001',
  OPEN_METEO_FORECAST_API_URL: 'https://api.open-meteo.com/v1/forecast',
  OPEN_METEO_GEOCODING_API_URL: 'https://geocoding-api.open-meteo.com/v1/search',
} as const
