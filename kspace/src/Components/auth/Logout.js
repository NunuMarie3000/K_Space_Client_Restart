import React from 'react'
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

export default function Logout({logout}) {
  return (
    <Button
      onClick={logout}
      variant="contained"
      startIcon={<LogoutIcon />}
      sx={{
        fontFamily: "'Michroma', sans-serif",
        fontSize: { xs: '0.75rem', sm: '0.875rem' },
        fontWeight: 600,
        background: 'linear-gradient(135deg, rgba(135, 206, 250, 0.6) 0%, rgba(144, 238, 144, 0.6) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        color: 'text.primary',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        borderRadius: '12px',
        textTransform: 'none',
        px: { xs: 1.5, sm: 2 },
        py: { xs: 0.75, sm: 1 },
        '&:hover': {
          background: 'linear-gradient(135deg, rgba(135, 206, 250, 0.8) 0%, rgba(144, 238, 144, 0.8) 100%)',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        },
        transition: 'all 0.2s ease',
      }}
    >
      Logout
    </Button>
  )
}