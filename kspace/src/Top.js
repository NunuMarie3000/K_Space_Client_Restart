import React, { useState, useEffect } from 'react'
import App from './App'
import axios from 'axios'
import LoadingPage from './Components/LoadingPage'
import Login from './Components/auth/Login'
import { useAuth0 } from '@auth0/auth0-react'

// i need to make axios request here to get the user's layout info when they log in...

export default function Top() {
  const { loginWithRedirect, logout, isLoading, user } = useAuth0()
  const [userLayout, setLayout] = useState('')
  const [isSiteLoading, setSiteLoading] = useState('')

  const getLayout = async () => {
    setSiteLoading(true)
    // /layout/:user
    const userId = process.env.REACT_APP_MY_ID
    const url = `${process.env.REACT_APP_SERVER}layout/${userId}`
    try {
      const response = await axios.get(url)
      setLayout(response.data[0])
      setSiteLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getLayout()
  }, [])

  if(isSiteLoading){
    return(
      <><LoadingPage/></>
    )
  }else{
    if(user && !isLoading){
      return(
        <><App userInfoAuth={user} logout={logout} userLayout={userLayout} getLayout={getLayout} /></>
      )
    }else if(!user && !isLoading){
      return(
        <><Login loginWithRedirect={loginWithRedirect} /></>
      )
    }
  } 
}
