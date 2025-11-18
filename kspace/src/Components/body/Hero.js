import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, Box } from '@mui/material'
import EditHero from './EditHero'

// user will have choice of one or two images, if one, render the img as a multiple, if two, render both images
// or maybe not, we'll see

export default function Hero() {
  const userLayout = useSelector((state) => state.userData.userLayout)
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false)

  if (!userLayout) return null

  const { heroImg1, heroImg2, heroImg1Alt, heroImg2Alt } = userLayout

  const handleClick = () => {
    setIsEditBtnClicked(!isEditBtnClicked)
  }
  
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
      <CardContent sx={{ position: 'relative', zIndex: 1, p: { xs: 1, sm: 2 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {heroImg1 && (
            <Box
              component="img"
              alt={heroImg1Alt || 'Hero image 1'}
              src={heroImg1}
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '48%' },
                height: { xs: 'auto', sm: '250px' },
                objectFit: 'cover',
                borderRadius: '15px',
                border: '3px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
            />
          )}
          {heroImg2 && (
            <Box
              component="img"
              alt={heroImg2Alt || 'Hero image 2'}
              src={heroImg2}
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '48%' },
                height: { xs: 'auto', sm: '250px' },
                objectFit: 'cover',
                borderRadius: '15px',
                border: '3px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
            />
          )}
        </Box>
        <Box 
          className='edit-me-brackets' 
          onClick={handleClick}
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
            mt: 2,
            textAlign: 'center',
            width: '100%'
          }}
        >
          [Edit Me]
        </Box>
      </CardContent>
    </Card>
    <EditHero 
      isEditBtnClicked={isEditBtnClicked}
      handleClick={handleClick}
    />
    </>
  )
}