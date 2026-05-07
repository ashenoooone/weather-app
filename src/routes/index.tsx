import { getMeQueryOptions } from '@/entities/user/model/query-options'
import { TOKEN_KEY } from '@/shared/model/consts'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => null,
  beforeLoad: async ({ context }) => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (!token) {
      throw redirect({ to: '/auth/login', replace: true })
    }

    try {
      await context.queryClient.ensureQueryData(getMeQueryOptions)
    }
    catch {
      localStorage.removeItem(TOKEN_KEY)
      throw redirect({ to: '/auth/login', replace: true })
    }

    throw redirect({ to: '/user', replace: true })
  },
})
