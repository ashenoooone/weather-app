import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { TooltipProvider } from '@/shared/ui/tooltip'
import { useTheme } from '@/shared/model/theme.store'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Link } from '@/shared/ui/link'
import { Typography } from '@/shared/ui/typography'
import type { QueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

function RootLayout() {
  const theme = useTheme()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <TooltipProvider>
      <Outlet />
      <TanStackRouterDevtools />
    </TooltipProvider>
  )
}

type RootRouteContext = {
  queryClient: QueryClient
}

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Typography variant="small">Ошибка 404</Typography>
          <CardTitle>Страница не найдена</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Typography variant="muted">
            Такой страницы нет или ссылка устарела.
            Вернитесь на главную страницу приложения.
          </Typography>
          <Button asChild>
            <Link to="/" variant="inherit">На главную</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})
