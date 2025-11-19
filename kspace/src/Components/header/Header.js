import React, { Component } from 'react'
import Filter from './Filter'
import Logout from '../auth/Logout'
import EditLayoutButton from '../layout/EditLayoutButton'
import { Box, Typography } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups'
import { glassmorphismWithOverlay, typography } from '../../styles'

export default class Header extends Component {
  render() {

    return (
      <Box
        className='header-container'
        sx={{
          ...glassmorphismWithOverlay,
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
              ...typography,
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
          <EditLayoutButton />
          <Logout logout={this.props.logout} />
        </Box>
      </Box>
    )
  }
}