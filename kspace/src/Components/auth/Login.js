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
    <Box sx={pageContainer}>
      <Container maxWidth="sm">
        <Card sx={glassmorphismStyle}>
          <CardContent sx={cardContentPadding}>
            <Typography variant="h3" component="h1" sx={heading1}>
              welcome to k_space <i className="fa-solid fa-users"></i>
            </Typography>
            
            <Typography variant="h5" component="h2" sx={heading2}>
              Please login
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={formContainer}>
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
                Login
              </Button>
            </Box>
            
            <Box sx={navLinkContainer}>
              <Typography variant="body2" sx={bodyText}>
                Don't have an account?{' '}
                <Button onClick={switchToRegister} sx={linkButton}>
                  Register here
                </Button>
              </Typography>
              <Typography variant="body2" sx={bodyText}>
                Forgot password?{' '}
                <Button onClick={switchToForgotPassword} sx={linkButton}>
                  Reset it here
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
