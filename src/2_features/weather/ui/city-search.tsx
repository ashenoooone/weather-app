import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/shared/ui/combobox'
import { useWeatherPageActions, useWeatherPageStore } from '../model/weather-page.store'
import { useQuery } from '@tanstack/react-query'
import { citySearchQueryOptions } from '@/entities/weather/model/query-options'
import type { WeatherCity } from '@/entities/weather/model/types'

export function CitySearch() {
  const { citySearch } = useWeatherPageStore()
  const { setCitySearch } = useWeatherPageActions()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCitySearch(e.target.value)
  }

  const citySearchQuery = useQuery(citySearchQueryOptions({ search: citySearch }))

  return (
    <Combobox items={citySearchQuery.data ?? []}>
      <ComboboxInput value={citySearch} onChange={handleChange} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: WeatherCity) => (
            <ComboboxItem key={item.id} value={item}>
              {item.name}
              {' '}
              {item.latitude}
              {' '}
              {item.longitude}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
