import React from 'react'
import type { AppProps } from 'next/app'
import { theme } from '../theme'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthenticatorProvider } from 'context'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <AuthenticatorProvider>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </AuthenticatorProvider>
)
export default App
