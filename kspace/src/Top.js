import React, { useState, useEffect } from 'react'
import App from './App'
import Login from './Components/auth/Login'
import Register from './Components/auth/Register'
import axios from 'axios'

export default function Top() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    // Check for existing token on load
    const token = localStorage.getItem('token')
    if (token) {
      axios.get(`${process.env.REACT_APP_SERVER}verify`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data.user)
      })
      .catch(() => {
        localStorage.removeItem('token')
      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const switchToRegister = () => setIsLogin(false)
  const switchToLogin = () => setIsLogin(true)

  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    return <App user={user} logout={handleLogout} />
  } else {
    return isLogin ? (
      <Login onLogin={handleLogin} switchToRegister={switchToRegister} />
    ) : (
      <Register onRegister={handleLogin} switchToLogin={switchToLogin} />
    )
  }
}
