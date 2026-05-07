import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { TooltipProvider } from '@/shared/ui/tooltip'
import { useTheme } from '@/shared/model/theme.store'
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

export const Route = createRootRouteWithContext<RootRouteContext>()({ component: RootLayout })
