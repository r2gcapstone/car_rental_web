import { useEffect } from 'react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useUserCredentials } from 'services/zustandVariables'
import { useAccount } from 'lib'

interface AuthenticatorProvider {
  children: React.ReactNode
}

export const AuthenticatorProvider: React.FC<AuthenticatorProvider> = ({
  children
}) => {
  const { signOut } = useAccount()
  const userCred = getCookie('ADMIN_TOKEN')
  const userData = userCred && JSON.parse(userCred as string)
  const updateUserCredentials = useUserCredentials(
    (state) => state.updateUserCred
  )
  const router = useRouter()

  const adminPathname = [
    '/admin/dashboard',
    '/admin/account-management',
    '/admin/transaction-history',
    '/admin/activity-log',
    '/admin/subscription-management',
    '/admin/admin-profile'
  ]
  const protectedRouters = adminPathname.includes(router.pathname)

  useEffect(() => {
    if (!userData?.token && protectedRouters) {
      router.push('/sign-in')
      return
    }

    if (!!userData?.token && router.pathname === '/sign-in') {
      router.replace('/admin/dashboard')
      return
    }

    updateUserCredentials(userData?.email)
  }, [signOut, userCred])

  return <>{children}</>
}
