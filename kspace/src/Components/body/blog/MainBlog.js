// this is gonna display the latest blog post, link to all the users' other public posts, 
import React from 'react'
import { useSelector } from 'react-redux'
import Latest from './Latest'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { glassmorphismWithOverlay, getBodyTextStyle } from '../../../styles'

export default function MainBlog({ blogs, id }) {
  const navigate = useNavigate()
  const userLayout = useSelector((state) => state.userData.userLayout)

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

  return (
    <Card sx={glassmorphismWithOverlay}>
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h5" 
          component="h4" 
          sx={{ 
            textAlign: 'center',
            ...getBodyTextStyle(userLayout, {
              mb: 3,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }),
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