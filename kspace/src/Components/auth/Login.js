import React, { useState } from 'react'
import axios from 'axios'

export default function Login({ onLogin, switchToRegister, switchToForgotPassword }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = { email, password };
      const response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER}auth/login`,
        data: {
          email: userData.email,
          password: userData.password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Call parent handler with user data and token
      onLogin(response.data.user, response.data.token)
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className='login-page'>
      <h1>welcome to k_space <i className="fa-solid fa-users"></i></h1>
      <h3>Please login</h3>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      
      <div className="auth-links">
          <p>
            Don't have an account?{' '}
            <button className="link-button" onClick={switchToRegister}>
              Register here
            </button>
          </p>
          <p>
            Forgot password?{' '}
            <button className="link-button" onClick={switchToForgotPassword}>
              Reset it here
            </button>
          </p>
        </div>
    </div>
  )
}
