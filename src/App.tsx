import React from 'react'
import Nav from './componets/Nav'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './componets/auth/Login'
import Register from './componets/auth/Register'
import Statistics from './componets/pages/Statistics'
import Votes from './componets/pages/Votes'

export default function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='votes' element={<Votes/>}/>
        <Route path='statistics' element={<Statistics/>}/>
        <Route path='/' element={<Navigate to={'/votes'}/>}/>
      </Routes>
    </div>
  )
}
