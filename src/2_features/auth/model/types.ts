// --- dto ---

import type { User } from '@/entities/user/model/types'

export type LoginRequestDto = {
  login: string
  password: string
}

export type LoginResponseDto = User[]

export type RegisterRequestDto = {
  login: string
  password: string
  role: string
}

export type RegisterResponseDto = {
  id: string
  login: string
  password: string
  role: string
}

// --- form values ---

export type LoginFormValues = {
  login: string
  password: string
}

export type RegisterFormValues = {
  login: string
  password: string
  role: string
}
