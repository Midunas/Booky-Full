import React, { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookyPage from './pages/BookyPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import CreateBookyPage from './pages/CreateBookyPage';
import JoinBookyPage from './pages/JoinBookyPage';
import Layout from './components/layout/Layout';


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
      >
        <Routes>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/login' element={<LoginPage isLoggedI={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
          <Route path='/Booky' element={<BookyPage />}></Route>
          <Route path='/create-booky' element={<CreateBookyPage />}></Route>
          <Route path='/join-booky' element={<JoinBookyPage />}></Route>
          <Route path='/' element={<WelcomePage />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter >

  )
}

export default App;