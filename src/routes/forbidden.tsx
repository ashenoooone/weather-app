import { getMeQueryOptions } from '@/entities/user/model/query-options'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { TOKEN_KEY } from '@/shared/model/consts'
import { Link } from '@/shared/ui/link'
import { Typography } from '@/shared/ui/typography'
import { createFileRoute, redirect, isRedirect } from '@tanstack/react-router'

export const Route = createFileRoute('/forbidden')({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      return
    }

    try {
      const user = await context.queryClient.ensureQueryData(getMeQueryOptions)
      if (user) {
        throw redirect({ to: '/user', replace: true })
      }
    }
    catch (error) {
      if (isRedirect(error)) {
        throw error
      }
    }
  },
})

function RouteComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Typography variant="small">Ошибка 403</Typography>
          <CardTitle>Доступ запрещён</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Typography variant="muted">
            Эта страница доступна только авторизованным пользователям.
            Войдите в аккаунт, чтобы продолжить.
          </Typography>
          <Button asChild>
            <Link to="/auth/login" variant="inherit">Перейти ко входу</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
