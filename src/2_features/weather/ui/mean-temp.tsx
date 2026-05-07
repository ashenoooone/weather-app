import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { transformToMovingAverageData } from '../model/transformers'
import { useCurrentCityData } from '../model/use-current-city-data'
import { shouldAnimateChart } from '../model/chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
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
  const isAnimationActive = shouldAnimateChart(meanData.length)

  if (isError) {
    return <div className="text-sm text-destructive">Не удалось загрузить данные погоды.</div>
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Скользящая средняя температуры</CardTitle>
        <Typography variant="muted">Тренд температуры без резких часовых колебаний</Typography>
      </CardHeader>
      <CardContent>
        <LineChart
          style={{ width: '100%', aspectRatio: 1.618 }}
          responsive
          data={meanData}
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
          <Line
            activeDot={{ r: 4 }}
            dataKey="average"
            dot={{ r: 2, strokeWidth: 1 }}
            isAnimationActive={isAnimationActive}
            name="Скользящая средняя"
            stroke="var(--chart-2)"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </CardContent>
    </Card>
  )
}
