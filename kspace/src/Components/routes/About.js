import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Container, Card, CardContent, Typography, CircularProgress } from '@mui/material'
import Footer from '../body/Footer'
import {
  glassmorphismStyle,
  pageContainer,
  cardContentPadding,
  appColors,
  getCustomGradient,
  getHeadingStyle,
  getBodyTextStyle,
  getTextColor,
} from '../../styles'

export default function About() {
  const userLayout = useSelector((state) => state.userData.userLayout)

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
              welcome to k_space <Typography component="span" sx={{ fontStyle: 'italic', fontSize: '0.8em', color: getTextColor(userLayout) }}>v2.0.0</Typography>
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Typography 
                variant="body1"
                sx={{
                  ...getBodyTextStyle(userLayout, {
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                    lineHeight: 1.8,
                    wordSpacing: '5px',
                  }),
                }}
              >
                My name is Storm O'Bryant and I'm the creator of k_space!
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{
                  ...getBodyTextStyle(userLayout, {
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                    lineHeight: 1.8,
                  }),
                }}
              >
                This project was based on the nostalgia I feel for y2k culture, the early 2000s and simpler times of social media and blogging :)
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{
                  ...getBodyTextStyle(userLayout, {
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                    lineHeight: 1.8,
                  }),
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