// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { MainProvider } from '../context/MainContext'
import Layout from '../layout/Layout'
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (

    <ChakraProvider>
      <MainProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </MainProvider>
    </ChakraProvider>

  )
}

export default MyApp