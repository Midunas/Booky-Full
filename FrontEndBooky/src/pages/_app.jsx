// pages/_app.js
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { MainProvider } from '../context/MainContext'
import Layout from '../layout/Layout'
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {

  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: "",
        },
      }),
    },
  });

  return (
    <ThemeProvider attribute="class">
      <MainProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </MainProvider>
    </ThemeProvider>
  )
}

export default MyApp