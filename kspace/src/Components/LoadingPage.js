import React from 'react'
import { Box, Container, Card, CardContent, Typography, CircularProgress } from '@mui/material'

export default function LoadingPage() {
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
          <CardContent sx={{ p: { xs: 4, sm: 5, md: 6 }, textAlign: 'center' }}>
            <CircularProgress 
              size={60} 
              sx={{ 
                mb: 3,
                color: 'rgba(0, 0, 0, 0.7)',
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1"
              sx={{
                fontFamily: "'Michroma', sans-serif",
                fontWeight: 'bold',
                mb: 2,
                textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)',
              }}
            >
              Loading...
            </Typography>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{
                fontFamily: "'Michroma', sans-serif",
                fontStyle: 'italic',
                color: 'rgba(0, 0, 0, 0.8)',
              }}
            >
              thank you for your patience :)
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
