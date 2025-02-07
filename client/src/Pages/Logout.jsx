import React from 'react'
import { useadmin } from '../context/admincontext'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function Logout() {
    const {Logout}=useadmin()
    useEffect(() => {
      
    Logout()
    window.location.reload()
      
    }, [Logout])
    
  return <Navigate to="/"/>
}
