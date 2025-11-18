import React from 'react'
import { Box, Typography } from '@mui/material'

export default function Latest({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return (
      <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', textAlign: 'center' }}>
        No blog entries yet
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        border: '2px solid rgba(255, 255, 255, 0.4)',
        padding: { xs: '1rem', sm: '1.5rem' },
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(5px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Typography 
        variant="h6" 
        component="h5" 
        sx={{
          fontFamily: "'Michroma', sans-serif",
          mb: 2,
          fontWeight: 'bold',
          fontSize: { xs: '1rem', sm: '1.25rem' }
        }}
      >
        {blogs[0].title}
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: { xs: '0.9rem', sm: '1rem' },
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap'
        }}
      >
        {blogs[0].body}
      </Typography>
    </Box>
  )
}