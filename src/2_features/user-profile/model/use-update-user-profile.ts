import { updateCurrentUser } from '@/entities/user/model/api'
import { USER_QUERY_KEYS } from '@/entities/user/model/query-options'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateUserProfile() {
  const queryClient = useQueryClient()

  return useMutation({
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
