import React from 'react'
import { Box, Container, Card, CardContent, Typography, CircularProgress } from '@mui/material'
import Footer from '../body/Footer'
import {
  glassmorphismStyle,
  pageContainer,
  cardContentPadding,
  appColors,
  getCustomGradient,
  getHeadingStyle,
  getTextColor,
} from '../../styles'

export default function Welcome({ userLayout }) {

  if (!userLayout) {
    return (
      <Box sx={pageContainer}>
        <Container maxWidth="sm">
          <Card sx={glassmorphismStyle}>
            <CardContent sx={{ p: { xs: 4, sm: 5, md: 6 }, textAlign: 'center' }}>
              <CircularProgress 
                size={60} 
                sx={{ 
                  mb: 2,
                  color: appColors.textPrimary,
                }} 
              />
              <Typography 
                variant="h6" 
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                  fontWeight: 'bold',
                  color: appColors.textPrimary,
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
        background: getCustomGradient(userLayout),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: getTextColor(userLayout),
        pt: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Card sx={glassmorphismStyle}>
          <CardContent sx={cardContentPadding}>
            <Typography 
              variant="h3" 
              component="h1"
              sx={{
                ...getHeadingStyle(userLayout, 'h1'),
                mb: 3,
              }}
            >
              welcome to k_space
            </Typography>
          </CardContent>
        </Card>
        
        <Footer />
      </Container>
    </Box>
  )
}
