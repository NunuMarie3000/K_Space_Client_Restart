import React, { useState } from 'react'
import axios from 'axios'

export default function Register({ onRegister, switchToLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3002/auth/register',
        data: {
          username,
          email,
          password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Format user data to match expected structure
      const formattedUser = {
        name: response.data.user.username,
        email: response.data.user.email,
        email_verified: true,
        sub: response.data.user._id
      };

      localStorage.setItem('token', response.data.token)
      onRegister(formattedUser)
    } catch (err) {
      console.error('Registration error:', err)

      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', err.response.data)
        setError(err.response.data.error || 'Registration failed')
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received')
        setError('No response from server. Please try again.')
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', err.message)
        setError('Failed to send registration request')
      }
    }
  }

  return (
    <div className='login-page'>
      <h1>welcome to k_space <i className="fa-solid fa-users"></i></h1>
      <h3>Create an Account</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ fontFamily: "'Michroma', sans-serif" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ fontFamily: "'Michroma', sans-serif" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ fontFamily: "'Michroma', sans-serif" }}
        />
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ fontFamily: "'Michroma', sans-serif" }}>Register</button>
      </form>

      <p>
        Already have an account?{' '}
        <button
          className="link-button"
          onClick={switchToLogin}
          style={{ fontFamily: "'Michroma', sans-serif" }}
        >
          Login here
        </button>
      </p>
    </div>
  )
}
