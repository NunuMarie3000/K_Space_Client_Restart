import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Container, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material'

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

  // Frutiger Aero glassmorphism styling
  const glassmorphismStyle = {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px) saturate(180%)',
    WebkitBackdropFilter: 'blur(10px) saturate(180%)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  }

  // Frutiger Aero gradient background
  const frutigerAeroGradient = 'linear-gradient(135deg, #87CEEB 0%, #90EE90 50%, #ADD8E6 100%)'

  if (error && (!token || !email)) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: frutigerAeroGradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Container maxWidth="sm">
          <Card sx={glassmorphismStyle}>
            <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              <Alert severity="error" sx={{ fontFamily: "'Michroma', sans-serif", mb: 2 }}>
                {error}
              </Alert>
              <Button
                onClick={switchToLogin}
                variant="contained"
                fullWidth
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  color: 'black',
                  fontWeight: 'bold',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(31, 38, 135, 0.5)',
                  },
                  transition: 'all 0.3s ease',
                }}
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
    <Box
      sx={{
        minHeight: '100vh',
        background: frutigerAeroGradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Container maxWidth="sm">
        <Card sx={glassmorphismStyle}>
          <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            <Typography 
              variant="h3" 
              component="h1"
              sx={{
                fontFamily: "'Michroma', sans-serif",
                fontWeight: 'bold',
                mb: 2,
                textAlign: 'center',
                textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)',
              }}
            >
              welcome to k_space <i className="fa-solid fa-users"></i>
            </Typography>
            
            <Typography 
              variant="h5" 
              component="h2"
              sx={{
                fontFamily: "'Michroma', sans-serif",
                mb: 3,
                textAlign: 'center',
              }}
            >
              Reset Your Password
            </Typography>
            
            {message && (
              <Alert severity="success" sx={{ fontFamily: "'Michroma', sans-serif", mb: 2 }}>
                {message}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                type="password"
                label="New Password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: "'Michroma', sans-serif",
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.7)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: "'Michroma', sans-serif",
                    color: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              />
              {error && (
                <Alert severity="error" sx={{ fontFamily: "'Michroma', sans-serif" }}>
                  {error}
                </Alert>
              )}
              <Button 
                type="submit" 
                variant="contained"
                fullWidth
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  color: 'black',
                  fontWeight: 'bold',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(31, 38, 135, 0.5)',
                  },
                  transition: 'all 0.3s ease',
                }}
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
