import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/shared/ui/combobox'
import { useWeatherPageActions, useWeatherPageStore } from '../model/weather-page.store'
import { useQuery } from '@tanstack/react-query'
import { citySearchQueryOptions } from '@/entities/weather/model/query-options'
import type { WeatherCity } from '@/entities/weather/model/types'
import { Typography } from '@/shared/ui/typography'
import { Label } from '@/shared/ui/label'
import { Card, CardContent } from '@/shared/ui/card'

export function CitySearch() {
  const { city, citySearch } = useWeatherPageStore()
  const { setCity, setCitySearch } = useWeatherPageActions()

  // TODO: в идеале инфинит подгрузку делать
  const citySearchQuery = useQuery(citySearchQueryOptions({ search: citySearch, perPage: 100 }))

  return (
    <Card className="max-w-2xl">
      <CardContent>
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
          <Label className="flex-col items-start gap-4">
            <span className="text-sm font-medium text-muted-foreground">Введите город</span>
            <ComboboxInput
              placeholder="Найти город"
              showClear
              className="h-12 w-full rounded-xl border border-border/70 bg-input/70"
            />
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
      </CardContent>
    </Card>
  )
}
