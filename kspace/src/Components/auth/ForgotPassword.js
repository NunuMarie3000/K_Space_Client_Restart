import React, { useState } from 'react'
import axios from 'axios'

export default function ForgotPassword({ switchToLogin }) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}auth/forgot-password`, {
        email
      })
      setMessage(response.data.message)
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset email')
    }
  }

  return (
    <div className='login-page'>
      <h1>Reset Password</h1>
      {message && <p className="success" style={{ color: 'green' }}>{message}</p>}
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ fontFamily: "'Michroma', sans-serif" }}
        />
        <button 
          type="submit"
          style={{ fontFamily: "'Michroma', sans-serif" }}
        >
          Send Reset Link
        </button>
      </form>
      
      <p>
        Remember your password?{' '}
        <button
          className="link-button"
          onClick={switchToLogin}
          style={{ fontFamily: "'Michroma', sans-serif" }}
        >
          Back to Login
        </button>
      </p>
    </div>
  )
}
