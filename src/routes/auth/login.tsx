import { LoginForm } from '@/features/auth/ui/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
    </div>
  )
}
