import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { TooltipProvider } from '@/shared/ui/tooltip'
import type { QueryClient } from '@tanstack/react-query'

function RootLayout() {
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
