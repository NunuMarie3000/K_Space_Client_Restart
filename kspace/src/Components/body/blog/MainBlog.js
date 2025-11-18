// this is gonna display the latest blog post, link to all the users' other public posts, 
import React from 'react'
import Latest from './Latest'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function MainBlog({ blogs, id, userLayout }) {
  const navigate = useNavigate()

  const handleEditClick = () => {
    if (blogs && blogs.length > 0 && blogs[0]._id) {
      // Navigate to editblog with the latest blog's ID and autoEdit flag
      // Pass userLayout as state (EditBlog expects it as 'layout')
      navigate('/editblog', {
        state: {
          ...userLayout,
          blogId: blogs[0]._id,
          autoEdit: true
        }
      })
    }
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
          variant="h5" 
          component="h4" 
          sx={{ 
            textAlign: 'center',
            fontFamily: "'Michroma', sans-serif",
            mb: 3,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          My Latest blog entry
        </Typography>
        <Latest blogs={blogs}/>
        {blogs && blogs.length > 0 && (
          <Box 
            className='edit-me-brackets' 
            onClick={handleEditClick}
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
        )}
      </CardContent>
    </Card>
  )
}