import React,{ useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Userboard from './components/Userboard'
import Adminboard from './components/Adminboard'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import Edit  from './components/Edit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <Adminboard/> */}

      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/add' element={<Userboard/>}/>
      <Route path='/edit' element={<Edit/>}/>
      <Route path='/admin' element={<Adminboard/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
        
      </Routes>
    </>
  )
}

export default App
