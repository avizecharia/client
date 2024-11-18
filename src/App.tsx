import React, { useEffect } from 'react'
import Nav from './componets/Nav'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './componets/auth/Login'
import Register from './componets/auth/Register'
import Statistics from './componets/pages/Statistics'
import Votes from './componets/pages/Votes'
import { socket } from './main'
import { useAppDispatch } from './redux/store'
import { fetchCandidates } from './redux/slices/candidatesSlice'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const dis= useAppDispatch()
  // useEffect(()=>{
  //   socket.on("newDataHasOccurred",()=>{
  //     dis(fetchCandidates())
  //     toast.info("Someone somewhere just voted");
  //   })

  // },[])
  return (
    <div>
      <Nav/>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        theme="light"
        pauseOnHover
        // stacked
      />
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
