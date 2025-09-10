import { useAuth } from '@/components/auth'
import Typo from '@nui/ui/typo'

export default function DashboardHeader() {
  const { userData } = useAuth()

  return (
    <div tw="flex flex-col gap-y-1">
      <Typo size="3xl" color="gray-900" fontWeight="semibold">
        Welcome back {userData?.fullname}
      </Typo>
      <Typo size="md" color="gray-500">
        You have 0 task to do today, good luck!
      </Typo>
    </div>
  )
}
