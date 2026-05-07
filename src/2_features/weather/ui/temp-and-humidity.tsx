import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { transformToTempAndHumidityData } from '../model/transformers'
import { useCurrentCityData } from '../model/use-current-city-data'
import { shouldAnimateChart } from '../model/chart'
import { WeatherChartState } from './weather-chart-state'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'
import { useMemo } from 'react'

type Props = {
  className?: string
}

export function TempAndHumidity(props: Props) {
  const { className } = props
  const { data, isError, isLoading } = useCurrentCityData()

  const chartData = useMemo(() => {
    return data?.data ? transformToTempAndHumidityData(data.data) : []
  }, [data])
  const isAnimationActive = shouldAnimateChart(chartData.length)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Температура и влажность</CardTitle>
        <Typography variant="muted">Сравнение двух показателей на разных осях Y</Typography>
      </CardHeader>
      <CardContent>
        <WeatherChartState isEmpty={chartData.length === 0} isError={isError} isLoading={isLoading}>
          <LineChart
            style={{ width: '100%', aspectRatio: 1.618 }}
            responsive
            data={chartData}
            margin={{
              top: 8,
              right: 20,
              left: 8,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
            <XAxis axisLine={false} dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} tickLine={false} />
            <YAxis
              axisLine={false}
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              tickLine={false}
              unit="°C"
              width="auto"
              yAxisId="temperature"
            />
            <YAxis
              axisLine={false}
              orientation="right"
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              tickLine={false}
              unit="%"
              width="auto"
              yAxisId="humidity"
            />
            <Tooltip contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: 12 }} />
            <Legend wrapperStyle={{ color: 'var(--text-secondary)', fontSize: 13 }} />
            <Line
              activeDot={{ r: 4 }}
              dataKey="temperature"
              dot={{ r: 2, strokeWidth: 1 }}
              isAnimationActive={isAnimationActive}
              name="Температура"
              stroke="var(--chart-line)"
              strokeWidth={2}
              type="monotone"
              yAxisId="temperature"
            />
            <Line
              activeDot={{ r: 4 }}
              dataKey="humidity"
              dot={{ r: 2, strokeWidth: 1 }}
              isAnimationActive={isAnimationActive}
              name="Влажность"
              stroke="var(--chart-2)"
              strokeWidth={2}
              type="monotone"
              yAxisId="humidity"
            />
          </LineChart>
        </WeatherChartState>
      </CardContent>
    </Card>
  )
}
