import { getMeQueryOptions } from '@/entities/user/model/query-options'
import { CitySearch } from '@/features/weather/ui/city-search'
import { LinearTemp } from '@/features/weather/ui/linear-temp'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Separator } from '@/shared/ui/separator'
import { HistogramTemp } from '@/features/weather/ui/histogram-temp'
import { MeanTemp } from '@/features/weather/ui/mean-temp'
import { TempAndHumidity } from '@/features/weather/ui/temp-and-humidity'
import { Typography } from '@/shared/ui/typography'
import { Card, CardContent } from '@/shared/ui/card'
import { WeatherRange } from '@/entities/weather/model/types'
import { useWeatherPageActions, useWeatherPageStore } from '@/features/weather/model/weather-page.store'
import type { WeatherRange as WeatherRangeValue } from '@/entities/weather/model/types'

const weatherRangeOptions: Array<{ label: string, value: WeatherRangeValue }> = [
  { label: '1 день', value: WeatherRange.ONE_DAY },
  { label: '3 дня', value: WeatherRange.THREE_DAYS },
  { label: '7 дней', value: WeatherRange.SEVEN_DAYS },
  { label: '14 дней', value: WeatherRange.FOURTEEN_DAYS },
]

export const Route = createFileRoute('/(authorized)/_layout/weather')({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(getMeQueryOptions)

    if (!user.data) {
      throw redirect({ to: '/forbidden' })
    }

    return {
      user: user.data,
    }
  },
})

function RouteComponent() {
  const { range } = useWeatherPageStore()
  const { setRange } = useWeatherPageActions()

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 text-sm">
      <div className="space-y-2">
        <Typography as="h1" variant="h1">Weather Dashboard</Typography>
        <Typography variant="lead">Аналитика температуры и влажности по выбранному городу.</Typography>
      </div>

      <CitySearch />

      <Card className="max-w-2xl">
        <CardContent>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">Диапазон дат</span>
            <select
              className="h-11 rounded-xl border border-border/70 bg-input/70 px-4 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
              value={range}
              onChange={event => setRange(Number(event.target.value) as WeatherRangeValue)}
            >
              {weatherRangeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </CardContent>
      </Card>

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
