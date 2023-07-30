import React from 'react'
import { AuthProvider } from 'context'
import type { AppProps } from 'next/app'
import { theme } from '../theme'
import { ChakraProvider } from '@chakra-ui/react'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </ChakraProvider>
)
export default App
