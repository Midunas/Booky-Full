import { createContext, useEffect, useState } from "react";
import useDarkMode from "../hook/useDarkMode";
import { get } from "../plugins/http";
const ISSERVER = typeof window === "undefined"

const MainContext = createContext()

const MainProvider = ({ children }) => {

  const [user, setUser] = useState();
  // const [colorTheme, setTheme] = useDarkMode()

  let userSecret = ''
  if (!ISSERVER) {
    userSecret = localStorage.getItem('secret')
  }

  const getUser = async (secret) => {
    const res = await get("getUser/" + secret)
    const data = await res.json()
    setUser((userData) => ({ ...userData, ...data.userExists[0] }))
  }

  useEffect(() => {
    if (user?.secret) {
      getUser(user.secret)
    }
  }, [user?.secret])

  useEffect(() => {
    if (userSecret) {
      getUser(userSecret)
    }
  },)

  return (
    <MainContext.Provider value={{ user, getUser, setUser }}>
      {/* <MainContext.Provider value={{ user, setTheme, colorTheme, getUser, setUser }}> */}
      {children}
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }