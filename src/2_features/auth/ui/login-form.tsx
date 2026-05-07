import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Controller, useForm } from 'react-hook-form'
import type { LoginFormValues } from '../model/types'
import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { PasswordInput } from '@/shared/ui/password-input'
import { Button } from '@/shared/ui/button'
import { useLogin } from '../model/use-login'
import { toast } from 'sonner'
import { ApiError } from '@/shared/api/error'
import { Link } from '@/shared/ui/link'
import { Typography } from '@/shared/ui/typography'

export function LoginForm() {
  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const loginMutation = useLogin()

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(data)
      toast.success('Авторизация успешна', {
        description: 'Вы успешно вошли в систему',
      })
    }
    catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
      }
      else {
        toast.error('Ошибка при авторизации', {
          description: 'Попробуйте позже',
        })
      }
    }
  }

  return (
    <Card className="max-w-[400px] w-full">
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            control={loginForm.control}
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
            control={loginForm.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>
                  Пароль
                </FieldLabel>
                <PasswordInput placeholder="Введите пароль" {...field} />
                {fieldState.invalid && <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />}
              </Field>
            )}
          />
          <div className="flex flex-col gap-2 items-center">
            <Button type="submit" className="w-full">Войти</Button>
            <Typography variant="small">
              Нет аккаунта?
              {' '}
              <Link variant="inherit" to="/auth/register">Регистрация</Link>
            </Typography>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
