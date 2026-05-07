import type { OpenMeteoForecastResponse } from '@/entities/weather/model/types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { ComponentProps } from 'react'
import type { LineChart } from 'recharts'

type LinearData = ComponentProps<typeof LineChart>['data']

export function transformToLinearData(data: OpenMeteoForecastResponse): LinearData {
  return data.hourly?.time?.map((time, index) => {
    return {
      name: format(new Date(time), 'dd.MM HH:mm', { locale: ru }),
      value: data.hourly?.temperature_2m?.[index],
    }
  })
}
