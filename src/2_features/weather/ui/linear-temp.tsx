import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts'
import { useCurrentCityData } from '../model/use-current-city-data'
import { shouldAnimateChart } from '../model/chart'
import { transformToLinearData } from '../model/transformers'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'
import { useMemo } from 'react'

export function LinearTemp() {
  const { data, isError } = useCurrentCityData()

  const linearData = useMemo(() => {
    return data?.data ? (transformToLinearData(data.data) ?? []) : []
  }, [data])
  const isAnimationActive = shouldAnimateChart(linearData.length)

  if (isError) {
    return <div className="text-sm text-destructive">Не удалось загрузить данные погоды.</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Линейный график температуры</CardTitle>
        <Typography variant="muted">Изменение температуры по времени</Typography>
      </CardHeader>
      <CardContent>
        <LineChart
          style={{ width: '100%', aspectRatio: 1.618 }}
          responsive
          data={linearData}
          margin={{
            top: 8,
            right: 20,
            left: 8,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
          <XAxis axisLine={false} dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} tickLine={false} />
          <YAxis axisLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} tickLine={false} width="auto" />
          <Tooltip contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: 12 }} />
          <Legend wrapperStyle={{ color: 'var(--text-secondary)', fontSize: 13 }} />
          <Line
            activeDot={{ r: 4 }}
            dataKey="value"
            dot={{ r: 2, strokeWidth: 1 }}
            isAnimationActive={isAnimationActive}
            name="Температура"
            stroke="var(--chart-line)"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </CardContent>
    </Card>
  )
}
