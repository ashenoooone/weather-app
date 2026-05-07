import { ApiError } from '@/shared/api/error'
import { getLogin, register } from './api'
import { mutationOptions } from '@tanstack/react-query'
import { TOKEN_KEY } from '@/shared/model/consts'

export const getLoginMutationOptions = mutationOptions({
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

export const registerMutationOptions = mutationOptions({
  mutationFn: register,
})
