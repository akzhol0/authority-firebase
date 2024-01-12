import React from 'react';
import ReactDOM from 'react-dom/client';
import Loader from './components/Loader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import MainPage from './components/MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loader/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/main-page' element={<MainPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App