import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout as logoutAction } from './store/authSlice';
import { clearUserData } from './store/userDataSlice';
import App from './App';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import ForgotPassword from './Components/auth/ForgotPassword';
import ResetPassword from './Components/auth/ResetPassword';
import LoadingPage from './Components/LoadingPage';
import axios from 'axios';

export default function Top() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
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
    // Check for existing token on load - but only if not already authenticated from Redux
    if (!isAuthenticated) {
      const authToken = localStorage.getItem('token')
      if (authToken) {
        axios.get(`${process.env.REACT_APP_SERVER}verify`, {
          headers: { Authorization: `Bearer ${authToken}` }
        })
          .then(res => {
            dispatch(setCredentials({ user: res.data.user, token: authToken }))
          })
          .catch(() => {
            localStorage.removeItem('token')
            dispatch(logoutAction())
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    } else {
      // Already authenticated from persisted state
      setLoading(false)
    }
  }, [email, resetToken, searchParams, isAuthenticated, dispatch])

  const handleLogin = (userData, token) => {
    dispatch(setCredentials({ user: userData, token }))
  }

  const handleLogout = () => {
    dispatch(logoutAction())
    dispatch(clearUserData())
  }

  const switchToLogin = () => setView('login')
  const switchToRegister = () => setView('register')
  const switchToForgotPassword = () => setView('forgot-password')

  if (loading) {
    return <LoadingPage />
  }

  if (user && isAuthenticated) {
    return <App logout={handleLogout} />
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
