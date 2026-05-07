const backendBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001'

export const config = {
  ...import.meta.env,
  API_BASE_URL: backendBaseUrl,
  BACKEND_BASE_URL: backendBaseUrl,
} as const
