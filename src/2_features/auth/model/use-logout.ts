import { USER_QUERY_KEYS } from '@/entities/user/model/query-options'
import { TOKEN_KEY } from '@/shared/model/consts'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return async () => {
    localStorage.removeItem(TOKEN_KEY)
    queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.ME })
    await navigate({ to: '/auth/login', replace: true })
  }
}
