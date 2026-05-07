import type { AxiosInstance } from 'axios'
import { ApiError, isApiError, toApiError } from './error'
import { TOKEN_KEY } from '../model/consts'
import { seconds } from '../lib/time'
import { router } from '../model/router'

export function attachDelayInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const delay = Math.max(0, Math.random() * 1) // 0-1 seconds

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(config)
      }, seconds(delay))
    })
  })
}

export function attachApiErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    response => response,
    (error: unknown) => Promise.reject(toApiError(error)),
  )
}

// сделал по требованиям из тз, сама авторизация на деле утиная за счет того, что бек моковый
export function attachAuthInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (!token) {
      throw new ApiError({
        message: 'Пользователь не авторизован',
        code: 'USER_NOT_AUTHORIZED',
      })
    }

    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  instance.interceptors.response.use((response) => {
    return response
  }, (error: unknown) => {
    if (isApiError(error) && (error.code === 'USER_NOT_AUTHORIZED' || error.status === 403)) {
      localStorage.removeItem(TOKEN_KEY)
      void router.navigate({
        to: '/auth/login',
        replace: true,
      })
    }
    return Promise.reject(error)
  })
}
