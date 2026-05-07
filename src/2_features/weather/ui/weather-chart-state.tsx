import { Typography } from '@/shared/ui/typography'

type WeatherChartStateProps = {
  children: React.ReactNode
  isEmpty: boolean
  isError: boolean
  isLoading: boolean
}

export function WeatherChartState(props: WeatherChartStateProps) {
  const { children, isEmpty, isError, isLoading } = props

  if (isError) {
    return <Typography className="text-destructive">Не удалось загрузить данные погоды.</Typography>
  }

  if (isLoading) {
    return <Typography variant="muted">Загружаем данные погоды...</Typography>
  }

  if (isEmpty) {
    return <Typography variant="muted">Выберите город, чтобы построить график.</Typography>
  }

  return children
}
