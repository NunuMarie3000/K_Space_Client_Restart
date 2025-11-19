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
    <Box sx={pageContainer}>
      <Container maxWidth="sm">
        <Card sx={glassmorphismStyle}>
          <CardContent sx={cardContentPadding}>
            <Typography variant="h3" component="h1" sx={heading1}>
              welcome to k_space <i className="fa-solid fa-users"></i>
            </Typography>
            
            <Typography variant="h5" component="h2" sx={heading2}>
              Reset Password
            </Typography>
            
            {message && (
              <Alert severity="success" sx={{ ...alertStyle, mb: 2 }}>
                {message}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={formContainer}>
              <TextField
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Send Reset Link
              </Button>
            </Box>
            
            <Box sx={navLinkContainer}>
              <Typography variant="body2" sx={bodyText}>
                Remember your password?{' '}
                <Button onClick={switchToLogin} sx={linkButton}>
                  Back to Login
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
