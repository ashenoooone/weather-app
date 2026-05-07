import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { transformToTempAndHumidityData } from '../model/transformers'
import { useCurrentCityData } from '../model/use-current-city-data'
import { Typography } from '@/shared/ui/typography'
import { useMemo } from 'react'

type Props = {
  className?: string
}

export function TempAndHumidity(props: Props) {
  const { className } = props
  const { data, isError } = useCurrentCityData()

  const chartData = useMemo(() => {
    return data?.data ? transformToTempAndHumidityData(data.data) : []
  }, [data])

  if (isError) {
    return <div className="text-sm text-destructive">Не удалось загрузить данные погоды.</div>
  }

  return (
    <div className={className}>
      <Typography as="h3" variant="h3">Температура и влажность</Typography>
      <LineChart
        style={{ width: '100%', aspectRatio: 1.618 }}
        responsive
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="temperature" width="auto" unit="°C" />
        <YAxis yAxisId="humidity" orientation="right" width="auto" unit="%" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          name="Температура"
          stroke="#8884d8"
          yAxisId="temperature"
          isAnimationActive={true}
        />
        <Line
          type="monotone"
          dataKey="humidity"
          name="Влажность"
          stroke="#82ca9d"
          yAxisId="humidity"
          isAnimationActive={true}
        />
      </LineChart>
    </div>
  )
}
