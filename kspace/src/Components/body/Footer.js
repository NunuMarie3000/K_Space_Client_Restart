import React from 'react'
import { Box, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'right',
        fontFamily: "'Michroma', sans-serif",
        mt: 4,
        py: 2,
        px: 2,
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(5px)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
        Storm O'Bryant <br/> &copy;StormyWeatherCreations, 2022
      </Typography>
    </Box>
  )
}
