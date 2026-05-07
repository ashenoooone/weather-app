import { AppSidebar } from '@/app/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(authorized)/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="h-12 border-b flex items-center px-3">
          <SidebarTrigger />
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
