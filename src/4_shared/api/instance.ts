import { config } from '../model/config'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { seconds } from '../lib/time'

export const $instance = axios.create({
  baseURL: config.API_BASE_URL,
})

function attachDelayInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const delay = Math.max(0, Math.random() * 1) // 0-1 seconds

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(config)
      }, seconds(delay))
    })
  })
}

attachDelayInterceptor($instance)
