import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { transformToMovingAverageData } from '../model/transformers'
import { useCurrentCityData } from '../model/use-current-city-data'
import { Typography } from '@/shared/ui/typography'
import { useMemo } from 'react'

type Props = {
  className?: string
}

export function MeanTemp(props: Props) {
  const { className } = props
  const { data, isError } = useCurrentCityData()

  const meanData = useMemo(() => {
    return data?.data ? transformToMovingAverageData(data.data) : []
  }, [data])

  if (isError) {
    return <div className="text-sm text-destructive">Не удалось загрузить данные погоды.</div>
  }

  return (
    <div className={className}>
      <Typography as="h3" variant="h3">Скользящая средняя температуры</Typography>
      <LineChart
        style={{ width: '100%', aspectRatio: 1.618 }}
        responsive
        data={meanData}
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
        <Line type="monotone" dataKey="average" name="Скользящая средняя" stroke="#82ca9d" isAnimationActive={true} />
      </LineChart>
    </div>
  )
}
