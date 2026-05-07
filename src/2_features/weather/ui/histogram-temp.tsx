import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { transformToTemperatureDistributionData } from '../model/transformers'
import { useCurrentCityData } from '../model/use-current-city-data'
import { shouldAnimateChart } from '../model/chart'
import { WeatherChartState } from './weather-chart-state'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'
import { useMemo } from 'react'

type Props = {
  className?: string
}

export function HistogramTemp(props: Props) {
  const { className } = props
  const { data, isError, isLoading } = useCurrentCityData()

  const histogramData = useMemo(() => {
    return data?.data ? transformToTemperatureDistributionData(data.data) : []
  }, [data])
  const isAnimationActive = shouldAnimateChart(histogramData.length)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Распределение температуры</CardTitle>
        <Typography variant="muted">Количество измерений в температурных диапазонах</Typography>
      </CardHeader>
      <CardContent>
        <WeatherChartState isEmpty={histogramData.length === 0} isError={isError} isLoading={isLoading}>
          <BarChart
            style={{ width: '100%', aspectRatio: 1.618 }}
            responsive
            data={histogramData}
            margin={{
              top: 8,
              right: 20,
              left: 8,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
            <XAxis axisLine={false} dataKey="range" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} tickLine={false} />
            <YAxis axisLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} tickLine={false} width="auto" />
            <Tooltip contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: 12 }} />
            <Legend wrapperStyle={{ color: 'var(--text-secondary)', fontSize: 13 }} />
            <Bar
              dataKey="count"
              fill="var(--chart-bar)"
              isAnimationActive={isAnimationActive}
              name="Количество измерений"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </WeatherChartState>
      </CardContent>
    </Card>
  )
}
