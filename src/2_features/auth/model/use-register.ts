import { useMutation } from '@tanstack/react-query'
import { registerMutationOptions } from './mutation-options'

export function useRegister() {
  return useMutation(registerMutationOptions)
}
