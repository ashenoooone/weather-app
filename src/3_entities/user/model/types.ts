import type { UserRole } from './user-roles'

export type { UserRole } from './user-roles'

export type User = {
  id: string
  login: string
  password: string
  token: string
  roles: UserRole[]
}
