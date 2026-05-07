import { getMeQueryOptions } from '@/entities/user/model/query-options'
import { CitySearch } from '@/features/weather/ui/city-search'
import { LinearTemp } from '@/features/weather/ui/linear-temp'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Separator } from '@/shared/ui/separator'

export const Route = createFileRoute('/(authorized)/_layout/weather')({
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
  return (
    <div className="text-sm">
      <CitySearch />

      <Separator className="my-10" />

      <div className="grid grid-cols-4">
        <LinearTemp />
      </div>
    </div>
  )
}
