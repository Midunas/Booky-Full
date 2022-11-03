/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookyPage from './pages/BookyPage';
import LoginPage from './pages/LoginPage';
import CreateBookyPage from './pages/CreateBookyPage';
import Layout from './components/layout/Layout';
import { get } from './plugins/http';
import MainContext from './context/MainContext';
import ProfilePage from './pages/ProfilePage';

const App = () => {

  //TODO: Useris nepersikrauna kai padarai log in ir log out 

  const [user, setUser] = useState()
  const secret = localStorage.getItem("secret")

  const getUser = async () => {
    if (secret) {
      const res = await get("getUser/" + secret)
      setUser(res.userExists[0])
      console.log('im reloading')
    }
  }

  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [])

  return (
    <MainContext.Provider value={user}>
      <BrowserRouter  >
        <Layout getUser={getUser}>
          <Routes>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/' element={<BookyPage />}></Route>
            <Route path='/signUp' element={<CreateBookyPage />}></Route>
            <Route path='/profile' element={<ProfilePage />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter >
    </MainContext.Provider>
  )
}

export default App;