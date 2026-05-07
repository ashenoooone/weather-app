import { config } from '../model/config'
import axios from 'axios'
import { attachDelayInterceptor, attachApiErrorInterceptor, attachAuthInterceptor } from './interceptors'

export const $instance = axios.create({
  baseURL: config.API_BASE_URL,
})

export const $authorizedInstance = axios.create({
  baseURL: config.API_BASE_URL,
})

attachDelayInterceptor($instance)
attachApiErrorInterceptor($instance)

attachDelayInterceptor($authorizedInstance)
attachApiErrorInterceptor($authorizedInstance)
attachAuthInterceptor($authorizedInstance)
