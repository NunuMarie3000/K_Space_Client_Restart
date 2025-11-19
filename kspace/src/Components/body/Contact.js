// this will have clickable for chatroom (stretch goal)
// page url, so others can view this page
// view blog = clicable to the user's blog, public facing, so...user/blog? or/blog?
import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, Typography, Box } from '@mui/material'
import MessageIcon from '@mui/icons-material/Message'
import { glassmorphismWithOverlay, getBodyTextStyle } from '../../styles'

export default function Contact() {
  const userLayout = useSelector((state) => state.userData.userLayout)
  
  return (
    <Card sx={glassmorphismWithOverlay}>
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            ...getBodyTextStyle(userLayout, {
              mb: 2,
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }),
          }}
        >
          Contact Me
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MessageIcon sx={{ color: 'primary.main' }} />
            <Typography variant="body1" sx={getBodyTextStyle(userLayout)}>
              Send Message
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            sx={{
              ...getBodyTextStyle(userLayout, {
                fontStyle: 'italic',
                opacity: 0.8,
              }),
            }}
          >
            [Page Url Coming Soon]
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}