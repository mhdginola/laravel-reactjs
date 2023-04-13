import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextsProvider'

function GuestLayout() {
  const {token} = useStateContext()

  if (token) {
    return <Navigate to="/" />
  }
  return (
    <div>
      <span>GuestLayout</span>
      <Outlet />
    </div>
  )
}

export default GuestLayout