import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextsProvider'

function DefaultLayout() {
  const {user, token, notification, setUser, setToken} = useStateContext()

  if(!token) {
    return <Navigate to="/login" />
  } 

  const onLogout = (e) => {
    e.preventDefault()
    axiosClient.post('/logout')
      .then(()=>{
        setUser({})
        setToken(null)
      })
  }

  useEffect(()=>{
    axiosClient.get('/user')
      .then(({data})=>{
        setUser(data)
      })
  },[])
  
  return (
    <div>
      <div>
        user {user.name}
      </div>
      <a href="#" onClick={onLogout}>Logout</a>
      {notification && <div className="notification">
        {notification}
      </div>}
      <div>
        <Link to='/users'>Users</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default DefaultLayout