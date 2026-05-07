import { QueryClient } from '@tanstack/react-query'
import { seconds } from '../lib/time'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // время жизни кеша ( сколько он будет считаться актуальным )
      staleTime: seconds(30),

      // время после которого данные будут удалены из кеша
      gcTime: seconds(60),

      retry: 3,

      // перезапрос данных при переподключении
      refetchOnReconnect: true,
      // перезапрос данных при монтировании компонента
      refetchOnMount: true,
      // перезапрос данных при фокусе окна
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})
