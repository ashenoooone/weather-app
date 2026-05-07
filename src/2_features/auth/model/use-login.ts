import { useMutation } from '@tanstack/react-query'
import { getLogin } from './api'
import { ApiError } from '../../../4_shared/api/error'
import { TOKEN_KEY } from '@/shared/model/consts'

export function useLogin() {
  return useMutation({
    mutationFn: getLogin,
    onSuccess: ({ data }) => {
      if (data.length === 0) {
        throw new ApiError({
          message: 'Пользователь не найден',
          code: 'USER_NOT_FOUND',
        })
      }
      if (data.length > 1) {
        throw new ApiError({
          message: 'Найдено несколько пользователей',
          code: 'MULTIPLE_USERS_FOUND',
        })
      }
      localStorage.setItem(TOKEN_KEY, data[0].token)
    },
  })
}
