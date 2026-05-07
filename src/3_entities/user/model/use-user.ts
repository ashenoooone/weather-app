import { useQuery } from '@tanstack/react-query'
import { getMeQueryOptions } from './query-options'

export function useCurrentUser() {
  return useQuery(getMeQueryOptions)
}
