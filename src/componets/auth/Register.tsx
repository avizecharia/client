import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router';
import { fetchRegister } from '../../redux/slices/userSlice';

export default function Register() {
  const dis = useAppDispatch();
  const {user ,status} = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?._id){
      navigate('/votes')
    }
  },[])
  const handelRegister = ()=>{
    dis(fetchRegister({username,password,isAdmin:admin }))
    navigate('/login')
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  return (
    <div> <input
    type="text"
    placeholder="User Name"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <input
    type="text"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <input type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)}/>
  <button onClick={handelRegister}>
        register
      </button></div>
  )
}
