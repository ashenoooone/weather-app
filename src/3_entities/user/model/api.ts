import { ApiError } from '@/shared/api/error'
import { TOKEN_KEY } from '@/shared/model/consts'
import { $authorizedInstance } from '@/shared/api/instance'
import type { User } from './types'

export async function getCurrentUser() {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) {
    throw new ApiError({ message: 'Нет токена авторизации', code: 'NO_TOKEN' })
  }
  const { data: users } = await $authorizedInstance.get<User[]>('/users', { params: { token } })
  if (users.length === 0) {
    throw new ApiError({ message: 'Пользователь не найден', code: 'USER_NOT_FOUND' })
  }
  if (users.length > 1) {
    throw new ApiError({ message: 'Конфликт данных пользователя', code: 'MULTIPLE_USERS_FOUND' })
  }
  return { ...users[0], roles: users[0].roles ?? [] }
}

export async function updateCurrentUser(data: Pick<User, 'id' | 'login' | 'password'>) {
  const { id, ...body } = data
  return $authorizedInstance.patch<User>(`/users/${id}`, body)
}
