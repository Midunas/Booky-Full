// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { MainProvider } from '../context/MainContext'
import Layout from '../layout/Layout'
import "../styles/globals.css";
import 'tailwindcss/tailwind.css';
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <ChakraProvider>
        <MainProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MainProvider>
      </ChakraProvider>
    </ThemeProvider>
  )
}

export default MyApp