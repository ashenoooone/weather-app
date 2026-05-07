import { RegisterForm } from '@/features/auth/ui/register-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <RegisterForm />
    </div>
  )
}
