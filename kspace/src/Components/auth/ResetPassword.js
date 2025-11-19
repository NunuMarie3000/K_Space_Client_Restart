import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Container, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material'
import {
  glassmorphismStyle,
  pageContainer,
  heading1,
  heading2,
  textFieldStyle,
  primaryButton,
  alertStyle,
  cardContentPadding,
  formContainer,
} from '../../styles'

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

  if (error && (!token || !email)) {
    return (
      <Box sx={pageContainer}>
        <Container maxWidth="sm">
          <Card sx={glassmorphismStyle}>
            <CardContent sx={cardContentPadding}>
              <Alert severity="error" sx={{ ...alertStyle, mb: 2 }}>
                {error}
              </Alert>
              <Button
                onClick={switchToLogin}
                variant="contained"
                fullWidth
                sx={primaryButton}
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    )
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
              Reset Your Password
            </Typography>
            
            {message && (
              <Alert severity="success" sx={{ ...alertStyle, mb: 2 }}>
                {message}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={formContainer}>
              <TextField
                type="password"
                label="New Password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                Reset Password
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
