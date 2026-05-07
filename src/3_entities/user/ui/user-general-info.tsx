import type { User } from '../model/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'

type UserGeneralInfoProps = {
  user: User
}

export function UserGeneralInfo({ user }: UserGeneralInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Общая информация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Typography variant="small">
          ID:
          {user.id}
        </Typography>
        <Typography variant="small">
          Токен:
          {user.token}
        </Typography>
      </CardContent>
    </Card>
  )
}
