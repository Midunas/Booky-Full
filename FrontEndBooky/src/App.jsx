/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookyPage from './pages/BookyPage';
import LoginPage from './pages/LoginPage';
import CreateBookyPage from './pages/CreateBookyPage';
import Layout from './layout/Layout';
import { get } from './plugins/http';
import MainContext from './context/MainContext';
import ProfilePage from './pages/ProfilePage';

const App = () => {

  //TODO: Make blank images for booky display
  //TODO: Remove message after error or success in creating booky/removing 
  const [user, setUser] = useState()
  const [theme, setTheme] = useState()
  const userSecret = localStorage.getItem('secret')

  const getUser = async (secret) => {

    const res = await get("getUser/" + secret)
    const data = await res.json()

    setUser((userData) => ({ ...userData, ...data.userExists[0] }))
    console.log('im reloading')
  }
  //TODO: just make this go on login click?

  useEffect(() => {
    if (user?.secret) {
      getUser(user.secret)
    }
  }, [user?.secret])

  useEffect(() => {
    if (userSecret) {
      getUser(userSecret)
    }
  }, [])

  const getCurrentTheme = () => {
    setTheme(localStorage.getItem('theme'))
  }

  return (
    <MainContext.Provider value={{
      user,
      setUser,
      getUser,
      getCurrentTheme,
      theme,
    }}>
      <BrowserRouter  >
        <Layout >
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