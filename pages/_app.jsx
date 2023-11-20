import React from "react";
import { theme } from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
// import AuthenticatorProvider from "@/context/AuthenticatorProvider";

function App({ Component, pageProps }) {
  return (
    // <AuthenticatorProvider>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    // </AuthenticatorProvider>
  );
}

export default App;
