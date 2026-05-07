import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Controller, useForm } from 'react-hook-form'
import type { RegisterFormValues } from '../model/types'
import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useRegister } from '../model/use-register'
import { toast } from 'sonner'
import { ApiError } from '@/shared/api/error'
import { Link } from '@/shared/ui/link'
import { Typography } from '@/shared/ui/typography'

export function RegisterForm() {
  const registerForm = useForm<RegisterFormValues>({
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const registerMutation = useRegister()

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerMutation.mutateAsync(data)
      toast.success('Регистрация успешна', {
        description: 'Аккаунт успешно создан',
      })
      registerForm.reset()
    }
    catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
      }
      else {
        toast.error('Ошибка при регистрации', {
          description: 'Попробуйте позже',
        })
      }
    }
  }

  return (
    <Card className="max-w-[400px] w-full">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={registerForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            control={registerForm.control}
            name="login"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>
                  Логин
                </FieldLabel>
                <Input placeholder="Введите логин" {...field} />
                {fieldState.invalid && <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />}
              </Field>
            )}
          />
          <Controller
            control={registerForm.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>
                  Пароль
                </FieldLabel>
                <Input placeholder="Введите пароль" {...field} type="password" />
                {fieldState.invalid && <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />}
              </Field>
            )}
          />
          <div className="flex flex-col gap-2 items-center">
            <Button type="submit" className="w-full">Зарегистрироваться</Button>
            <Typography variant="small">
              Уже есть аккаунт?
              {' '}
              <Link variant="inherit" to="/auth/login">Войти</Link>
            </Typography>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
