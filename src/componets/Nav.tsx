import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import userSlice from '../redux/slices/userSlice';

export default function Nav() {
  const navigate = useNavigate();
  const dis = useAppDispatch()
  
    const {user} = useAppSelector((state:RootState) => state.user)
    const handelLogout = () => {
      localStorage.removeItem("token")
      dis(userSlice.actions.logout())
      navigate('/login')
    }
  return (
    <div className='nav'>
        {user ? (<>
        <NavLink to={"/votes"} >Votes</NavLink>
        {user.isAdmin &&(<NavLink to={"/statistics"} >Statistics</NavLink>)}
        <button onClick={handelLogout}>logout</button>
        </>):<>
        <NavLink to={"/login"} >Login</NavLink>
        <NavLink to={"/register"} >Register</NavLink>
        </>}
    </div>
  )
}
