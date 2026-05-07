/**
 * Конвертирует секунды в миллисекунды
 * @param value - количество секунд
 * @returns количество миллисекунд
 */
export const seconds = (value: number): number => value * 1000

/**
 * Конвертирует минуты в миллисекунды
 * @param value - количество минут
 * @returns количество миллисекунд
 */
export const minutes = (value: number): number => value * 60 * 1000
