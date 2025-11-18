import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function ResetPassword({ token, email, switchToLogin }) {
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token || !email) {
      setError('Invalid reset link')
    }
  }, [token, email])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}auth/reset-password`, {
        email,
        token,
        newPassword
      })
      
      setMessage('Password successfully reset!')
      // Redirect to login after 2 seconds
      setTimeout(() => {
        switchToLogin()
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password')
    }
  }

  if (error) {
    return (
      <div className='login-page'>
        <p className="error" style={{ color: 'red' }}>{error}</p>
        <button 
          onClick={switchToLogin}
          style={{ fontFamily: "'Michroma', sans-serif" }}
        >
          Back to Login
        </button>
      </div>
    )
  }

  return (
    <div className='login-page'>
      <h1>Reset Your Password</h1>
      {message && <p className="success" style={{ color: 'green' }}>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ fontFamily: "'Michroma', sans-serif" }}
        />
        <button 
          type="submit"
          style={{ fontFamily: "'Michroma', sans-serif" }}
        >
          Reset Password
        </button>
      </form>
    </div>
  )
}
