import { $authorizedInstance } from '@/shared/api/instance'
import type { User } from './types'

export async function getCurrentUser() {
  return $authorizedInstance.get<User>('/user/me')
}
