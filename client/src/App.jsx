import React from 'react'
import HeroPage from './components/Hero-Page/HeroPage'
import PasswordGenerator from './components/Password-Generator/PasswordGenerator'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Registration from './components/Registration-Login/Registration'
import Login from './components/Registration-Login/Login'
import HomePage from './components/Home-Page/HomePage'
import RegistrationSuccessful from './components/Registration-Login/RegistrationSuccessful'

const App = () => {
  return (
    <BrowserRouter>

        <Routes>

          <Route exact path='/' element={<HeroPage />} ></Route>
          <Route exact path='/password_generator' element={<PasswordGenerator />} ></Route>
          <Route exact path='/registration' element={<Registration />} ></Route>
          <Route exact path='/registrationSuccessful' element={<RegistrationSuccessful/>} ></Route>
          <Route exact path='/login' element={<Login />} ></Route>
          <Route exact path='/home' element={<HomePage />} ></Route>

        </Routes>

    </BrowserRouter >
  )
}

export default App
