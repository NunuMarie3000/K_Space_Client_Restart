// profile component
// will hold:
// profile pic -editable, so put/patch request, name, bio, mood
// maybe everything in profile is editable with one modal, so only one put/patch request- one modal can edit profile pic, bio, and mood
import React, { useState } from 'react'
import EditProfile from './EditProfile'
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material'

export default function Profile({ id, profile, userInfoAuth, getProfile }) {
  const [isEditBtnClicked, setIsEditBtnClicked] = useState('')

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
    <Card sx={glassmorphismStyle}>
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontFamily: "'Michroma', sans-serif",
            fontSize: { xs: '1.5rem', sm: '2rem' },
            mb: 2,
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {profile.username && profile.username !== ' ' ? profile.username : userInfoAuth.name}
        </Typography>
        
        {/* Profile pic and bio */}
        <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, mb: 2 }}>
          <Avatar
            src={profile.profilePic ? profile.profilePic : userInfoAuth.picture}
            alt="profile"
            sx={{
              width: { xs: '100%', sm: 250 },
              height: { xs: 200, sm: 150 },
              borderRadius: '15px',
              border: '3px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}
            variant="rounded"
          />
          <Typography 
            variant="body1" 
            sx={{ 
              flex: 1,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.6
            }}
          >
            {profile.profile}
          </Typography>
        </Box>
        
        {/* Mood */}
        {profile.mood && (
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontStyle: 'italic',
              color: 'primary.main',
              fontWeight: 500
            }}
          >
            {profile.mood}
          </Typography>
        )}
        
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
            mt: 1
          }}
        >
          [Edit Me]
        </Box>

        <EditProfile 
          authProfilePic={userInfoAuth.picture} 
          authUsername={userInfoAuth.name} 
          username={profile.username} 
          profilePic={profile.profilePic} 
          getProfile={getProfile} 
          isEditBtnClicked={isEditBtnClicked} 
          handleClick={handleClick} 
          id={id} 
          profile={profile.profile} 
          mood={profile.mood} 
        />
      </CardContent>
    </Card>
  )
}