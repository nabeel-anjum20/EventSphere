import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({isAuthenticated  , children}) {

  const location = useLocation()
  
  if(location.pathname === "/"){
    if(!isAuthenticated){
      return <Navigate to={"/adminuserauth/login"}/>
    }else{
      return <Navigate to={"/admin/dashboard"}/>
    }
  }

  if(!isAuthenticated && location.pathname.includes("/admin/")){
    return <Navigate to={"/adminuserauth/login"}/>
  }

  return (
    <>
    {children}
    </>
  )
}

export default CheckAuth