import { updateCurrentUser } from '@/entities/user/model/api'
import { USER_QUERY_KEYS } from '@/entities/user/model/query-options'
import type { QueryClient } from '@tanstack/react-query'
import { mutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

export function updateUserProfileMutationOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationFn: updateCurrentUser,
    onSuccess: (response) => {
      queryClient.setQueryData(USER_QUERY_KEYS.ME, response.data)
      toast.success('Профиль обновлен')
    },
    onError: () => {
      toast.error('Не удалось обновить профиль')
    },
  })
}
