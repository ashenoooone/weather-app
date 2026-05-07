import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts'
import { useCurrentCityData } from '../model/use-current-city-data'
import { transformToLinearData } from '../model/transformers'
import { Typography } from '@/shared/ui/typography'
import { useMemo } from 'react'

export function LinearTemp() {
  const { data, isError } = useCurrentCityData()

  const linearData = useMemo(() => {
    return data?.data ? transformToLinearData(data.data) : []
  }, [data])

  if (isError) {
    return <div className="text-sm text-destructive">Не удалось загрузить данные погоды.</div>
  }

  return (
    <div className="space-y-4">
      <Typography as="h3" variant="h3">Линейный график температуры</Typography>
      <LineChart
        style={{ width: '100%', aspectRatio: 1.618 }}
        responsive
        data={linearData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" name="Температура" stroke="#8884d8" isAnimationActive={true} />
      </LineChart>
    </div>
  )
}
