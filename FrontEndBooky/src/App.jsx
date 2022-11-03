import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookyPage from './pages/BookyPage';
import LoginPage from './pages/LoginPage';
import CreateBookyPage from './pages/CreateBookyPage';
import Layout from './components/layout/Layout';
import { get } from './plugins/http';
import MainContext from './context/MainContext';

const App = () => {

  //TODO: Useris nepersikrauna kai padarai log in ir log out 

  const [user, setUser] = useState()

  async function getUser() {
    const secret = localStorage.getItem("secret")
    if (secret) {
      const res = await get("getUser/" + secret)
      setUser(res.userExists[0])
    }
  }
  useEffect(() => {
    getUser()
  }, [user])

  return (
    <MainContext.Provider value={user}>
      <BrowserRouter  >
        <Layout>
          <Routes>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/' element={<BookyPage />}></Route>
            <Route path='/signUp' element={<CreateBookyPage />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter >
    </MainContext.Provider>
  )
}

export default App;