type Role = 'weather_reader'

export type User = {
  id: string
  login: string
  password: string
  token: string
  role: Role
}
