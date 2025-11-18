import React, { Component } from 'react'
import Filter from './Filter'
import Logout from '../auth/Logout'
import { Box, Typography } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups'

export default class Header extends Component {
  render() {
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
      <Box
        className='header-container'
        sx={{
          ...glassmorphismStyle,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1.5, sm: 2 },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          padding: { xs: '1rem', sm: '1.5rem' },
          mb: { xs: 0.75, sm: 1 },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <GroupsIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: 'primary.main' }} />
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontFamily: "'Michroma', sans-serif",
              fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              m: 0,
            }}
          >
            k_space
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, flexWrap: 'wrap' }}>
          <Filter/>
          <Logout logout={this.props.logout} />
        </Box>
      </Box>
    )
  }
}