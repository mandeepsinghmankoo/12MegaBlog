import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice'  

function Logout() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() =>{
            dispatch(logout())
        })
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-[#514a2e] rounded-full' onClick={logoutHandler}>
        
        LogOut
    </button>
  )
}

export default Logout
