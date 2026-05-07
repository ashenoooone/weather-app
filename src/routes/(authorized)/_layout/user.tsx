import { UserProfileForm } from '@/features/user-profile/ui/user-profile-form'
import { UserGeneralInfo } from '@/entities/user/ui/user-general-info'
import { getMeQueryOptions } from '@/entities/user/model/query-options'
import { useCurrentUser } from '@/entities/user/model/use-user'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(authorized)/_layout/user')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(getMeQueryOptions)

    if (!user) {
      throw redirect({ to: '/forbidden' })
    }
  },
})

function RouteComponent() {
  const { data: user } = useCurrentUser()

  if (!user) {
    return null
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
      <UserGeneralInfo user={user} />
      <UserProfileForm user={user} />
    </div>
  )
}
