import { getMeQueryOptions } from '@/entities/user/model/query-options'
import { CitySearch } from '@/features/weather/ui/city-search'
import { LinearTemp } from '@/features/weather/ui/linear-temp'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Separator } from '@/shared/ui/separator'
import { HistogramTemp } from '@/features/weather/ui/histogram-temp'
import { MeanTemp } from '@/features/weather/ui/mean-temp'
import { TempAndHumidity } from '@/features/weather/ui/temp-and-humidity'

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

      <div className="grid grid-cols-2 gap-10">
        <LinearTemp />
        <HistogramTemp />
        <MeanTemp />
        <TempAndHumidity />
      </div>
    </div>
  )
}
