import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface UseSafePushTypes {
  safePush: (path: string) => void
}

export const useSafePush = (): UseSafePushTypes => {
  const [onChanging, setOnChanging] = useState(false)
  const handleRouteChange = (): void => {
    setOnChanging(false)
  }
  const router = useRouter()
  // safePush is used to avoid route pushing errors when users click multiple times or when the network is slow:  "Error: Abort fetching component for route"
  const safePush = (path: string): void => {
    if (onChanging) {
      return
    }
    setOnChanging(true)
    router.push(path)
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router, setOnChanging])
  return { safePush }
}
