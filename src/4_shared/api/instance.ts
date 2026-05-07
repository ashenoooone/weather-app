import { config } from '../model/config'
import axios from 'axios'

export const $instance = axios.create({
  baseURL: config.API_BASE_URL,
})
