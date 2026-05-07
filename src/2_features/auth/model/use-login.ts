import { useMutation } from '@tanstack/react-query'
import { getLogin } from './api'
import { TOKEN_KEY } from '@/shared/model/consts'

export function useLogin() {
  return useMutation({
    mutationFn: getLogin,
    onSuccess: ({ data }) => {
      if (data.length === 0) {
        throw new Error('Пользователь не найден')
      }
      if (data.length > 1) {
        throw new Error('Найдено несколько пользователей')
      }
      localStorage.setItem(TOKEN_KEY, data[0].token)
    },
  })
}
