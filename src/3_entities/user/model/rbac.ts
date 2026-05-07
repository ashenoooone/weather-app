import type { User } from './types'
import { WEATHER_READER_ROLE } from './user-roles'

export function canReadWeather(user: User) {
  return user.roles.includes(WEATHER_READER_ROLE)
}
