import './App.css'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Home from './components/Home'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AuthState from './context/auth/AuthState'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  useEffect(() => {
    axios.get('https://to-do-app-by-mern-stack.vercel.app/user/me', {
      withCredentials: true
    })
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }, [])

  return (
    <>
      <AuthState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/profile' element={<Profile />} />
          </Routes>
        </Router>
      </AuthState>
    </>
  )
}

export default App
