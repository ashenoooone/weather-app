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
        <header className="flex h-14 items-center border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl">
          <SidebarTrigger />
        </header>
        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
