/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookyPage from './pages/BookyPage';
import LoginPage from './pages/LoginPage';
import CreateBookyPage from './pages/SignUp';
import Layout from './layout/Layout';
import ProfilePage from './pages/ProfilePage';
import { MainProvider } from './context/MainContext';

const App = () => {

  return (
    <MainProvider>
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
    </MainProvider>
  )
}

export default App;