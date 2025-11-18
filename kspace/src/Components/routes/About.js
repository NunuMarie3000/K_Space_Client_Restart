import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Container, Card, CardContent, Typography, CircularProgress } from '@mui/material'
import Footer from '../body/Footer'

export default function About() {
  const userLayout = useSelector((state) => state.userData.userLayout)

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
  const frutigerAeroGradient = userLayout?.backImage 
    ? `linear-gradient(135deg, rgba(135, 206, 250, 0.3) 0%, rgba(144, 238, 144, 0.3) 50%, rgba(173, 216, 230, 0.3) 100%), url(${userLayout.backImage})`
    : userLayout?.backColor 
      ? `linear-gradient(135deg, rgba(135, 206, 250, 0.2) 0%, rgba(144, 238, 144, 0.2) 50%, rgba(173, 216, 230, 0.2) 100%), ${userLayout.backColor}`
      : 'linear-gradient(135deg, #87CEEB 0%, #90EE90 50%, #ADD8E6 100%)'

  if (!userLayout) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #87CEEB 0%, #90EE90 50%, #ADD8E6 100%)',
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
            <CardContent sx={{ p: { xs: 4, sm: 5, md: 6 }, textAlign: 'center' }}>
              <CircularProgress 
                size={60} 
                sx={{ 
                  mb: 2,
                  color: 'rgba(0, 0, 0, 0.7)',
                }} 
              />
              <Typography 
                variant="h6" 
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                  fontWeight: 'bold',
                }}
              >
                Loading...
              </Typography>
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
        color: userLayout ? userLayout.fontBodyColor : 'black',
        pt: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Card sx={glassmorphismStyle}>
          <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            <Typography 
              variant="h3" 
              component="h1"
              sx={{
                fontFamily: "'Michroma', sans-serif",
                fontWeight: 'bold',
                mb: 3,
                textAlign: 'center',
                textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)',
              }}
            >
              welcome to k_space <Typography component="span" sx={{ fontStyle: 'italic', fontSize: '0.8em' }}>v2.0.0</Typography>
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Typography 
                variant="body1"
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                  fontSize: { xs: '0.95rem', sm: '1.1rem' },
                  lineHeight: 1.8,
                  wordSpacing: '5px',
                }}
              >
                My name is Storm O'Bryant and I'm the creator of k_space!
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                  fontSize: { xs: '0.95rem', sm: '1.1rem' },
                  lineHeight: 1.8,
                }}
              >
                This project was based on the nostalgia I feel for y2k culture, the early 2000s and simpler times of social media and blogging :)
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                  fontSize: { xs: '0.95rem', sm: '1.1rem' },
                  lineHeight: 1.8,
                }}
              >
                This is a passion project that was also my solo project at Code School Memphis for my 301 Course!
              </Typography>
            </Box>
          </CardContent>
        </Card>
        
        <Footer />
      </Container>
    </Box>
  )
}