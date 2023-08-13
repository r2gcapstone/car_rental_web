import { useEffect } from 'react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useAccount } from 'lib'

interface AuthenticatorProvider {
  children: React.ReactNode
}

export const AuthenticatorProvider: React.FC<AuthenticatorProvider> = ({
  children
}) => {
  const { signOut } = useAccount()
  const userToken = getCookie('ADMIN_TOKEN')
  const router = useRouter()

  useEffect(() => {
    if (!!userToken) {
      router.push('/admin/dashboard')
      return
    }

    router.push('/sign-in')
  }, [userToken, signOut])

  return <>{children}</>
}
