import type { OpenMeteoForecastResponse } from '@/entities/weather/model/types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { ComponentProps } from 'react'
import type { LineChart } from 'recharts'

type LinearData = ComponentProps<typeof LineChart>['data']
type TemperatureDistributionData = Array<{
  count: number
  range: string
}>

export function transformToLinearData(data: OpenMeteoForecastResponse): LinearData {
  return data.hourly?.time?.map((time, index) => {
    return {
      name: format(new Date(time), 'dd.MM HH:mm', { locale: ru }),
      value: data.hourly?.temperature_2m?.[index],
    }
  })
}

export function transformToTemperatureDistributionData(
  data: OpenMeteoForecastResponse,
  binSize = 5,
): TemperatureDistributionData {
  const temperatures = data.hourly?.temperature_2m?.filter(item => typeof item === 'number') ?? []

  if (!temperatures.length) {
    return []
  }

  const min = Math.floor(Math.min(...temperatures) / binSize) * binSize
  const max = Math.ceil(Math.max(...temperatures) / binSize) * binSize
  const bins = new Map<number, number>()

  for (let start = min; start < max; start += binSize) {
    bins.set(start, 0)
  }

  temperatures.forEach((temperature) => {
    const binStart = Math.floor(temperature / binSize) * binSize
    bins.set(binStart, (bins.get(binStart) ?? 0) + 1)
  })

  return Array.from(bins.entries()).map(([start, count]) => ({
    count,
    range: `${start}–${start + binSize}°C`,
  }))
}
