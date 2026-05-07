const ANIMATION_POINTS_LIMIT = 120

export function shouldAnimateChart(dataLength: number) {
  return dataLength <= ANIMATION_POINTS_LIMIT
}
