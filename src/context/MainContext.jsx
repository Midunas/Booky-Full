import { createContext, useEffect, useState } from "react";
import { get } from "../plugins/http";

const MainContext = createContext()

const MainProvider = ({ children }) => {

  const [user, setUser] = useState();
  const [bookyName, setBookyName] = useState()

  const getUser = async () => {
    const res = await get("api/getUser/")
    const data = await res.json()
    setUser(data.userExists)
  }

  useEffect(() => {
    getUser()
  }, [])


  return (
    <MainContext.Provider value={{
      user,
      getUser,
      setUser,
      setBookyName,
      bookyName,
    }}>
      {/* <MainContext.Provider value={{ user, setTheme, colorTheme, getUser, setUser }}> */}
      {children}
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }