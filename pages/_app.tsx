import React from 'react'
import type { AppProps } from 'next/app'
import { theme } from '../theme'
import { ChakraProvider } from '@chakra-ui/react'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
)
export default App
