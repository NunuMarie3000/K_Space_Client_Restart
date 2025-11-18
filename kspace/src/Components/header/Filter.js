import React, { Component } from 'react'
import { Box, TextField, Typography } from '@mui/material'

export default class Filter extends Component {
  render() {
    return (
      <Box
        className='filterForm'
        sx={{
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Michroma', sans-serif",
            fontWeight: 500,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          Search:
        </Typography>
        <TextField
          disabled
          placeholder="nunumarie3000..."
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              fontFamily: "'Michroma', sans-serif",
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(5px)',
              borderRadius: '10px',
              '& fieldset': {
                border: '1px solid rgba(255, 255, 255, 0.3)',
              },
              '&:hover fieldset': {
                border: '1px solid rgba(255, 255, 255, 0.4)',
              },
              '&.Mui-disabled': {
                background: 'rgba(255, 255, 255, 0.1)',
                '& fieldset': {
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                },
              },
            },
            '& .MuiInputBase-input': {
              color: 'inherit',
            },
          }}
        />
      </Box>
    )
  }
}