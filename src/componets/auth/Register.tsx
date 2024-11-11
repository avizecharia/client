import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router';

export default function Register() {
  const dis = useAppDispatch();
  const {user} = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user?._id){
      navigate('/votes')
    }
  },[])
  return (
    <div>Register</div>
  )
}
