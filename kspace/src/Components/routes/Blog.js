import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Box, Container, Card, CardContent, Typography, CircularProgress } from '@mui/material'
import Footer from '../body/Footer'
import {
  glassmorphismStyle,
  pageContainer,
  appColors,
  getCustomGradient,
  getHeadingStyle,
  getBodyTextStyle,
  getTextColor,
} from '../../styles'
// this is where i'll get all my blogs for this user, won't be editable here, this will be public facing

export default function Blog() {
  const [blogs, setBlogs] = useState('')
  const userLayout = useSelector((state) => state.userData.userLayout)
  const userId = useSelector((state) => state.userData.userId)

  const getBlogs = async () => {
    if (!userId) return
    const url = `${process.env.REACT_APP_SERVER}${userId}/entries`
    try {
      await axios.get(url).then(res => setBlogs(res.data))
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (userId) {
      getBlogs()
    }
    //eslint-disable-next-line
  }, [userId])

  // Blog card with hover effect
  const blogCardStyle = {
    ...glassmorphismStyle,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 12px 40px 0 ${appColors.shadowColorHover}`,
    },
  }

  if (!userLayout) {
    return (
      <Box sx={pageContainer}>
        <Container maxWidth="sm">
          <Card sx={glassmorphismStyle}>
            <CardContent sx={{ p: { xs: 4, sm: 5, md: 6 }, textAlign: 'center' }}>
              <CircularProgress 
                size={60} 
                sx={{ 
                  mb: 2,
                  color: appColors.textPrimary,
                }} 
              />
              <Typography 
                variant="h6" 
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                  fontWeight: 'bold',
                  color: appColors.textPrimary,
                }}
              >
                Loading...
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: getCustomGradient(userLayout),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: getTextColor(userLayout),
        pt: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1"
          sx={{
            ...getHeadingStyle(userLayout, 'h1'),
            mb: 3,
          }}
        >
          Blog Posts
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {blogs !== '' && blogs.length > 0 ? (
            blogs.map(blog => (
              <Card 
                key={blog._id} 
                sx={blogCardStyle}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography 
                    variant="h5" 
                    component="h2"
                    sx={{
                      ...getBodyTextStyle(userLayout, {
                        fontWeight: 'bold',
                        mb: 1,
                      }),
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      ...getBodyTextStyle(userLayout, {
                        mb: 2,
                        fontStyle: 'italic',
                        opacity: 0.8,
                      }),
                    }}
                  >
                    Posted: {blog.date_of_entry}
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{
                      ...getBodyTextStyle(userLayout, {
                        lineHeight: 1.6,
                        whiteSpace: 'pre-wrap',
                      }),
                    }}
                  >
                    {blog.body}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card sx={glassmorphismStyle}>
              <CardContent>
                <Typography 
                  variant="body1"
                  sx={{
                    ...getBodyTextStyle(userLayout, {
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }),
                  }}
                >
                  No blog posts yet. Check back soon!
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
        
        <Footer />
      </Container>
    </Box>
  )
}
