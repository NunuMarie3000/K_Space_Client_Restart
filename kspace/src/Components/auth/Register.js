import React, { useState } from 'react'
import axios from 'axios'
import { Box, Container, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material'

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
              Create an Account
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                type="text"
                label="Username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              <TextField
                type="email"
                label="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <TextField
                type="password"
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Register
              </Button>
            </Box>
            
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5, textAlign: 'center' }}>
              <Typography 
                variant="body2"
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                }}
              >
                Already have an account?{' '}
                <Button
                  onClick={switchToLogin}
                  sx={{
                    fontFamily: "'Michroma', sans-serif",
                    color: 'inherit',
                    textDecoration: 'underline',
                    textTransform: 'none',
                    minWidth: 'auto',
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
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
