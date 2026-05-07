import { getMeQueryOptions } from '@/entities/user/model/query-options'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(authorized)/_layout/user')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(getMeQueryOptions)

    if (!user.data) {
      throw redirect({ to: '/auth/login' })
    }

    return {
      user: user.data,
    }
  },
})

function RouteComponent() {
  return <div className="text-sm">Страница пользователя</div>
}
