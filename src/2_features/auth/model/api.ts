import { $instance } from '@/shared/api/instance'
import type { LoginRequestDto, LoginResponseDto, RegisterRequestDto, RegisterResponseDto } from './types'

export async function getLogin(data: LoginRequestDto) {
  // сознательно делаем GET запрос, т.к апи моковое
  return $instance.get<LoginResponseDto>('/users', { params: data })
}

export async function register(data: RegisterRequestDto) {
  return $instance.post<RegisterResponseDto>('/users', data)
}
