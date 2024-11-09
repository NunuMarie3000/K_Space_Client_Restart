import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import App from './App';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import ForgotPassword from './Components/auth/ForgotPassword';
import ResetPassword from './Components/auth/ResetPassword';
import axios from 'axios';

export default function Top() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('login');
  const [searchParams] = useSearchParams();
  const [resetToken, setResetToken] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Check if we have reset password params
    const reset_token = searchParams.get('token')
    setResetToken(resetToken)
    const _email = searchParams.get('email')
    setEmail(email)
    if (reset_token && _email) {
      setView('reset-password')
    }
    // Check for existing token on load
    const authToken = localStorage.getItem('token')
    if (authToken) {
      axios.get(`${process.env.REACT_APP_SERVER}verify`, {
        headers: { Authorization: `Bearer ${authToken}` }
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
  }, [searchParams])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const switchToLogin = () => setView('login')
  const switchToRegister = () => setView('register')
  const switchToForgotPassword = () => setView('forgot-password')

  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    return <App user={user} logout={handleLogout} />
  }

  switch (view) {
    case 'register':
      return <Register onRegister={handleLogin} switchToLogin={switchToLogin} />
    case 'forgot-password':
      return <ForgotPassword switchToLogin={switchToLogin} />
    case 'reset-password':
      return (
        <ResetPassword
          resetToken={resetToken}
          email={email}
          switchToLogin={switchToLogin}
        />
      )
    default:
      return (
        <Login
          onLogin={handleLogin}
          switchToRegister={switchToRegister}
          switchToForgotPassword={switchToForgotPassword}
        />
      )
  }
}
