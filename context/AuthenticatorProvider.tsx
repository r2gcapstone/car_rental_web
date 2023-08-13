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

  useEffect(() => {
    if (!!userData?.token) {
      router.push('/admin/dashboard')
      updateUserCredentials(userData?.email)
      return
    }

    router.push('/sign-in')
  }, [userData, signOut])

  return <>{children}</>
}
