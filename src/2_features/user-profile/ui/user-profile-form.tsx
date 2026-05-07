import type { User } from '@/entities/user/model/types'
import type { UserProfileFormValues } from '../model/types'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { PasswordInput } from '@/shared/ui/password-input'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useUpdateUserProfile } from '../model/use-update-user-profile'

type UserProfileFormProps = {
  user: User
}

export function UserProfileForm({ user }: UserProfileFormProps) {
  const userForm = useForm<UserProfileFormValues>({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    userForm.reset({
      login: user.login,
      password: user.password,
    })
  }, [user, userForm])

  const updateUserMutation = useUpdateUserProfile()

  const onSubmit = async (data: UserProfileFormValues) => {
    await updateUserMutation.mutateAsync({ id: user.id, ...data })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Редактирование профиля</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={userForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            name="login"
            control={userForm.control}
            rules={{
              required: 'Логин обязателен',
            }}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Логин</FieldLabel>
                <Input placeholder="Введите логин" {...field} />
                {fieldState.invalid && (
                  <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={userForm.control}
            rules={{
              required: 'Пароль обязателен',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа',
              },
            }}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Пароль</FieldLabel>
                <PasswordInput placeholder="Введите пароль" {...field} />
                {fieldState.invalid && (
                  <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                )}
              </Field>
            )}
          />

          <Button type="submit" disabled={updateUserMutation.isPending}>
            {updateUserMutation.isPending ? 'Сохраняем...' : 'Сохранить изменения'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
