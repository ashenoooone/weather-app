import type { OpenMeteoForecastResponse } from '@/entities/weather/model/types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { ComponentProps } from 'react'
import type { LineChart } from 'recharts'

type LinearData = ComponentProps<typeof LineChart>['data']
type MovingAverageData = Array<{
  average: number
  name: string
  value: number
}>
type TemperatureDistributionData = Array<{
  count: number
  range: string
}>
type TempAndHumidityData = Array<{
  humidity: number
  name: string
  temperature: number
}>

/**
 * Преобразует hourly time + temperature в точки "время -> температура" для line chart.
 */
export function transformToLinearData(data: OpenMeteoForecastResponse): LinearData {
  return data.hourly?.time?.map((time, index) => {
    return {
      name: format(new Date(time), 'dd.MM HH:mm', { locale: ru }),
      value: data.hourly?.temperature_2m?.[index],
    }
  })
}

/**
 * Считает скользящую среднюю температуры.
 *
 * Для каждой точки берёт текущую температуру и N-1 предыдущих значений,
 * затем считает среднее арифметическое.
 *
 */
export function transformToMovingAverageData(
  data: OpenMeteoForecastResponse,
  windowSize = 3,
): MovingAverageData {
  const times = data.hourly?.time ?? []
  const temperatures = data.hourly?.temperature_2m ?? []

  return times.reduce<MovingAverageData>((acc, time, index) => {
    const temperature = temperatures[index]

    if (typeof temperature !== 'number') {
      return acc
    }

    const windowStart = Math.max(0, index - windowSize + 1)
    const window = temperatures
      .slice(windowStart, index + 1)
      .filter(item => typeof item === 'number')
    const average = window.reduce((sum, item) => sum + item, 0) / window.length

    acc.push({
      average: Number(average.toFixed(1)),
      name: format(new Date(time), 'dd.MM HH:mm', { locale: ru }),
      value: temperature,
    })

    return acc
  }, [])
}

/**
 * Строит распределение температур по интервалам.
 *
 * Температуры группируются по диапазонам шириной binSize, после чего
 * считается количество измерений в каждом диапазоне.
 *
 */
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

/**
 * Преобразует hourly time + temperature + humidity в точки для графика с двумя осями Y.
 */
export function transformToTempAndHumidityData(data: OpenMeteoForecastResponse): TempAndHumidityData {
  const times = data.hourly?.time ?? []
  const temperatures = data.hourly?.temperature_2m ?? []
  const humidityValues = data.hourly?.relative_humidity_2m ?? []

  return times.reduce<TempAndHumidityData>((acc, time, index) => {
    const temperature = temperatures[index]
    const humidity = humidityValues[index]

    if (typeof temperature !== 'number' || typeof humidity !== 'number') {
      return acc
    }

    acc.push({
      humidity,
      name: format(new Date(time), 'dd.MM HH:mm', { locale: ru }),
      temperature,
    })

    return acc
  }, [])
}
