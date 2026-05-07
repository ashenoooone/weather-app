import { queryOptions } from '@tanstack/react-query'
import { getCurrentUser } from './api'

export const USER_QUERY_KEYS = {
  ME: ['user', 'me'],
}

export const getMeQueryOptions = queryOptions({
  queryFn: getCurrentUser,
  queryKey: USER_QUERY_KEYS.ME,
  retry: 0,
})
