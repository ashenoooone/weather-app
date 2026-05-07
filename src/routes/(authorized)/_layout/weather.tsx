import { canReadWeather } from '@/entities/user/model/rbac'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
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

    if (!user) {
      throw redirect({ to: '/forbidden' })
    }

    if (!canReadWeather(user)) {
      throw redirect({ to: '/forbidden' })
    }

    return {
      user,
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
          <label className="flex flex-col gap-2" htmlFor="weather-range-select">
            <span className="text-sm font-medium text-muted-foreground">Диапазон дат</span>
            <Select
              value={String(range)}
              onValueChange={value => setRange(Number(value) as WeatherRangeValue)}
            >
              <SelectTrigger
                id="weather-range-select"
                className="h-11 w-full rounded-xl border-border/70 bg-input/70 px-4 text-start shadow-none focus-visible:ring-3 focus-visible:ring-ring/30"
              >
                <SelectValue placeholder="Выберите диапазон" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={6}
                align="start"
                matchTriggerWidth
              >
                {weatherRangeOptions.map(option => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
