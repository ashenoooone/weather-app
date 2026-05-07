import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/shared/ui/combobox'
import { useWeatherPageActions, useWeatherPageStore } from '../model/weather-page.store'
import { useQuery } from '@tanstack/react-query'
import { citySearchQueryOptions } from '@/entities/weather/model/query-options'
import type { WeatherCity } from '@/entities/weather/model/types'
import { Typography } from '@/shared/ui/typography'
import { Label } from '@/shared/ui/label'

export function CitySearch() {
  const { city, citySearch } = useWeatherPageStore()
  const { setCity, setCitySearch } = useWeatherPageActions()

  // TODO: в идеале инфинит подгрузку делать, но не стал заморачиваться
  const citySearchQuery = useQuery(citySearchQueryOptions({ search: citySearch, perPage: 100 }))

  return (
    <Combobox<WeatherCity>
      items={citySearchQuery.data ?? []}
      inputValue={citySearch}
      itemToStringLabel={item => item.name}
      filter={null}
      value={city}
      onInputValueChange={setCitySearch}
      onValueChange={(selectedCity) => {
        if (!selectedCity) {
          return
        }
        setCity(selectedCity)
        setCitySearch(selectedCity.name)
      }}
    >
      <Label className="flex-col items-start max-w-[400px]">
        Введите город
        <ComboboxInput placeholder="Найти город" showClear className="w-full" />
      </Label>
      <ComboboxContent>
        <ComboboxEmpty>
          {citySearchQuery.isFetching ? 'Ищем...' : 'Города не найдены'}
        </ComboboxEmpty>
        <ComboboxList>
          {(item: WeatherCity) => (
            <ComboboxItem key={item.id} value={item}>
              <Typography variant="body">{item.name}</Typography>
              <Typography variant="muted">
                {item.latitude}
                {', '}
                {item.longitude}
              </Typography>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
