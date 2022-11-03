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

  //TODO: Ask Andrius: Update booky modal re-fetch (count, setCount) nonsense.

  const [user, setUser] = useState()
  const userSecret = localStorage.getItem("secret")

  const getUser = async (secret) => {
    const res = await get("getUser/" + secret)
    setUser(res.userExists[0])
    console.log('im reloading')
  }

  //Kad galėtum reloadint page
  useEffect(() => {
    if (userSecret) {
      getUser(userSecret)
    }
  }, [])

  return (
    <MainContext.Provider value={{ user, setUser, getUser }}>
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