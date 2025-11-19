import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Container, Card, CardContent, Typography, CircularProgress } from '@mui/material'
import {
  glassmorphismStyle,
  appColors,
  getCustomGradient,
  getTextColor,
  getHeadingStyle,
  getBodyTextStyle,
} from '../styles'

export default function LoadingPage() {
  const userLayout = useSelector((state) => state.userData.userLayout)
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: getCustomGradient(userLayout),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
        color: getTextColor(userLayout),
      }}
    >
      <Container maxWidth="sm">
        <Card sx={glassmorphismStyle}>
          <CardContent sx={{ p: { xs: 4, sm: 5, md: 6 }, textAlign: 'center' }}>
            <CircularProgress 
              size={60} 
              sx={{ 
                mb: 3,
                color: appColors.textPrimary,
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1"
              sx={getHeadingStyle(userLayout, 'h1')}
            >
              Loading...
            </Typography>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{
                ...getBodyTextStyle(userLayout, {
                  fontStyle: 'italic',
                  opacity: 0.8,
                }),
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
