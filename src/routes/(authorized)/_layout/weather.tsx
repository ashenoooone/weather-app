import { getMeQueryOptions } from '@/entities/user/model/query-options'
import { CitySearch } from '@/features/weather/ui/city-search'
import { LinearTemp } from '@/features/weather/ui/linear-temp'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Separator } from '@/shared/ui/separator'
import { HistogramTemp } from '@/features/weather/ui/histogram-temp'
import { MeanTemp } from '@/features/weather/ui/mean-temp'
import { TempAndHumidity } from '@/features/weather/ui/temp-and-humidity'
import { Typography } from '@/shared/ui/typography'

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
    <div className="mx-auto flex max-w-7xl flex-col gap-10 text-sm">
      <div className="space-y-2">
        <Typography as="h1" variant="h1">Weather Dashboard</Typography>
        <Typography variant="lead">Аналитика температуры и влажности по выбранному городу.</Typography>
      </div>

      <CitySearch />

      <Separator className="bg-border/70" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <LinearTemp />
        <HistogramTemp />
        <MeanTemp />
        <TempAndHumidity />
      </div>
    </div>
  )
}
