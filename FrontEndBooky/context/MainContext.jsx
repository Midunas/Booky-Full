import { createContext, useEffect, useState } from "react";
import { get } from "../plugins/http";

const MainContext = createContext()

const MainProvider = ({ children }) => {

  const [user, setUser] = useState();

  let userSecret = ''
  if (typeof window !== "undefined") {
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