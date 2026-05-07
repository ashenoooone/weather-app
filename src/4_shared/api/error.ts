import { isAxiosError } from 'axios'

type ApiErrorParams = {
  message: string
  code?: string
  status?: number
  details?: unknown
}

export class ApiError extends Error {
  public readonly code: string
  public readonly status?: number
  public readonly details?: unknown

  constructor({ message, code = 'API_ERROR', status, details }: ApiErrorParams) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
    this.details = details
  }
}

export function isApiError(error: unknown): error is ApiError {
  if (error instanceof ApiError) {
    return true
  }
  if (!error || typeof error !== 'object') {
    return false
  }
  const errorWithShape = error as { name?: unknown, message?: unknown, code?: unknown }

  return errorWithShape.name === 'ApiError'
    && typeof errorWithShape.message === 'string'
    && typeof errorWithShape.code === 'string'
}

export function toApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error
  }
  if (isAxiosError(error)) {
    return new ApiError({
      message: error.response?.data?.message
        ?? error.message
        ?? 'Ошибка запроса',
      code: error.code ?? 'AXIOS_ERROR',
      status: error.response?.status,
      details: error.response?.data,
    })
  }
  if (error instanceof Error) {
    return new ApiError({
      message: error.message,
      code: 'UNEXPECTED_ERROR',
    })
  }

  return new ApiError({
    message: 'Неизвестная ошибка',
    code: 'UNKNOWN_ERROR',
    details: error,
  })
}
