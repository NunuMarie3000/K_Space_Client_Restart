import React, { Component } from 'react'
import { Card, CardContent, Typography, Chip, Stack, Box } from '@mui/material'
import EditInterests from './EditInterests'

export default class InterestsC extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditBtnClicked: false,
    }
  }

  handleClick = () => {
    this.setState({ isEditBtnClicked: !this.state.isEditBtnClicked })
  }

  render() {
    const { interests, id, getAboutMe, aboutMe } = this.props
    const { isEditBtnClicked } = this.state
    
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
      <>
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
            Interests
          </Typography>
          {interests && interests.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {interests.map((int, index) => (
                <Chip
                  key={index}
                  label={int}
                  sx={{
                    background: 'linear-gradient(135deg, rgba(135, 206, 250, 0.6) 0%, rgba(144, 238, 144, 0.6) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    color: 'text.primary',
                    fontWeight: 500,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
              No interests listed yet
            </Typography>
          )}
          <Box 
            className='edit-me-brackets' 
            onClick={this.handleClick}
            sx={{
              cursor: 'pointer',
              color: 'primary.main',
              fontWeight: 'bold',
              textDecoration: 'underline',
              '&:hover': {
                opacity: 0.8,
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
              display: 'inline-block',
              mt: 2
            }}
          >
            [Edit Me]
          </Box>
        </CardContent>
      </Card>
      <EditInterests 
        isEditBtnClicked={isEditBtnClicked}
        handleClick={this.handleClick}
        interests={interests}
        id={id}
        getAboutMe={getAboutMe}
        aboutMe={aboutMe}
      />
    </>
    )
  }
}
