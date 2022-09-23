import React from 'react'
import App from './App'
import Login from './Components/auth/Login'
import { useAuth0 } from '@auth0/auth0-react'

// i need to make axios request here to get the user's layout info when they log in...

export default function Top() {
  const { loginWithRedirect, logout, isLoading, user } = useAuth0()
  
if (user && !isLoading) {
    return (
      <><App user={user} logout={logout} /></>
    )
  } else if (!user && !isLoading) {
    return (
      <><Login loginWithRedirect={loginWithRedirect} /></>
    )
  }
}
