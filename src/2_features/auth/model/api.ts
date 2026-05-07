import { $instance } from '@/shared/api/instance'
import type { LoginRequestDto, LoginResponseDto, RegisterRequestDto, RegisterResponseDto } from './types'

function createUserToken() {
  return `mock-token-${crypto.randomUUID()}`
}

export async function getLogin(data: LoginRequestDto) {
  // сознательно делаем GET запрос, т.к апи моковое
  return $instance.get<LoginResponseDto>('/users', { params: data })
}

export async function register(data: RegisterRequestDto) {
  return $instance.post<RegisterResponseDto>('/users', {
    ...data,
    token: createUserToken(),
  })
}
