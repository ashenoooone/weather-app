import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { transformToTemperatureDistributionData } from '../model/transformers'
import { useCurrentCityData } from '../model/use-current-city-data'
import { useMemo } from 'react'

type Props = {
  className?: string
}

export function HistogramTemp(props: Props) {
  const { className } = props
  const { data, isError } = useCurrentCityData()

  const histogramData = useMemo(() => {
    return data?.data ? transformToTemperatureDistributionData(data.data) : []
  }, [data])

  if (isError) {
    return <div className="text-sm text-destructive">Не удалось загрузить данные погоды.</div>
  }

  return (
    <BarChart
      className={className}
      style={{ width: '100%', aspectRatio: 1.618 }}
      responsive
      data={histogramData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" name="Количество измерений" fill="#8884d8" isAnimationActive={true} />
    </BarChart>
  )
}
