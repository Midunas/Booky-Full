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

  //TODO: find a better way for the getUser on refresh.

  useEffect(() => {
    const isLogedIn = localStorage.getItem('loggedIn')
    if (isLogedIn) {
      getUser()
    }
  }, [])

  return (
    <MainContext.Provider value={{
      user,
      getUser,
      setUser,
      setBookyName,
      bookyName,
    }}>
      {children}
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }