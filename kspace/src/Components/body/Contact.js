// this will have clickable for chatroom (stretch goal)
// page url, so others can view this page
// view blog = clicable to the user's blog, public facing, so...user/blog? or/blog?
import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import MessageIcon from '@mui/icons-material/Message'
// import { Link } from 'react-router-dom'

export default function Contact() {
  // Frutiger Aero glassmorphism styling
  const glassmorphismStyle = {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px) saturate(180%)',
    WebkitBackdropFilter: 'blur(10px) saturate(180%)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '30%',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)',
      pointerEvents: 'none',
    }
  }

  return (
    <Card sx={glassmorphismStyle}>
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            fontFamily: "'Michroma', sans-serif",
            mb: 2,
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Contact Me
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MessageIcon sx={{ color: 'primary.main' }} />
            <Typography variant="body1">Send Message</Typography>
          </Box>
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            [Page Url Coming Soon]
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}