import React, { useState } from 'react'
import axios from 'axios'
import { Box, Container, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material'
import {
  glassmorphismStyle,
  pageContainer,
  heading1,
  heading2,
  bodyText,
  textFieldStyle,
  primaryButton,
  linkButton,
  alertStyle,
  cardContentPadding,
  formContainer,
  navLinkContainer,
} from '../../styles'

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
        url: `${process.env.REACT_APP_SERVER}auth/register`,
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

      onRegister(formattedUser, response.data.token)
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
    <Box sx={pageContainer}>
      <Container maxWidth="sm">
        <Card sx={glassmorphismStyle}>
          <CardContent sx={cardContentPadding}>
            <Typography variant="h3" component="h1" sx={heading1}>
              welcome to k_space <i className="fa-solid fa-users"></i>
            </Typography>
            
            <Typography variant="h5" component="h2" sx={heading2}>
              Create an Account
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={formContainer}>
              <TextField
                type="text"
                label="Username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                sx={textFieldStyle}
              />
              <TextField
                type="email"
                label="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                sx={textFieldStyle}
              />
              <TextField
                type="password"
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                sx={textFieldStyle}
              />
              {error && (
                <Alert severity="error" sx={alertStyle}>
                  {error}
                </Alert>
              )}
              <Button 
                type="submit" 
                variant="contained"
                fullWidth
                sx={primaryButton}
              >
                Register
              </Button>
            </Box>
            
            <Box sx={navLinkContainer}>
              <Typography variant="body2" sx={bodyText}>
                Already have an account?{' '}
                <Button onClick={switchToLogin} sx={linkButton}>
                  Login here
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
