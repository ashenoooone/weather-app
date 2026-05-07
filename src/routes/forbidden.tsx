import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Link } from '@/shared/ui/link'
import { Typography } from '@/shared/ui/typography'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/forbidden')({
  component: RouteComponent,
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
