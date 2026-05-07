import { useMutation } from '@tanstack/react-query'
import { getLoginMutationOptions } from './mutation-options'

export function useLogin() {
  return useMutation(getLoginMutationOptions)
}
