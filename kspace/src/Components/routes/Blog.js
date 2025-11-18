import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Box, Container, Card, CardContent, Typography, CircularProgress } from '@mui/material'
import Footer from '../body/Footer'
// this is where i'll get all my blogs for this user, won't be editable here, this will be public facing

export default function Blog() {
  const [blogs, setBlogs] = useState('')
  const userLayout = useSelector((state) => state.userData.userLayout)
  const userId = useSelector((state) => state.userData.userId)

  // Frutiger Aero glassmorphism styling
  const glassmorphismStyle = {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px) saturate(180%)',
    WebkitBackdropFilter: 'blur(10px) saturate(180%)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  }

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

  // Frutiger Aero gradient background
  const frutigerAeroGradient = userLayout?.backImage 
    ? `linear-gradient(135deg, rgba(135, 206, 250, 0.3) 0%, rgba(144, 238, 144, 0.3) 50%, rgba(173, 216, 230, 0.3) 100%), url(${userLayout.backImage})`
    : userLayout?.backColor 
      ? `linear-gradient(135deg, rgba(135, 206, 250, 0.2) 0%, rgba(144, 238, 144, 0.2) 50%, rgba(173, 216, 230, 0.2) 100%), ${userLayout.backColor}`
      : 'linear-gradient(135deg, #87CEEB 0%, #90EE90 50%, #ADD8E6 100%)'

  if (!userLayout) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #87CEEB 0%, #90EE90 50%, #ADD8E6 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Container maxWidth="sm">
          <Card sx={glassmorphismStyle}>
            <CardContent sx={{ p: { xs: 4, sm: 5, md: 6 }, textAlign: 'center' }}>
              <CircularProgress 
                size={60} 
                sx={{ 
                  mb: 2,
                  color: 'rgba(0, 0, 0, 0.7)',
                }} 
              />
              <Typography 
                variant="h6" 
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                  fontWeight: 'bold',
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
        background: frutigerAeroGradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: userLayout ? userLayout.fontBodyColor : 'black',
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
            fontFamily: "'Michroma', sans-serif",
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)',
          }}
        >
          Blog Posts
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {blogs !== '' && blogs.length > 0 ? (
            blogs.map(blog => (
              <Card 
                key={blog._id} 
                sx={{
                  ...glassmorphismStyle,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography 
                    variant="h5" 
                    component="h2"
                    sx={{
                      fontFamily: "'Michroma', sans-serif",
                      fontWeight: 'bold',
                      mb: 1,
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      fontFamily: "'Michroma', sans-serif",
                      mb: 2,
                      fontStyle: 'italic',
                    }}
                  >
                    Posted: {blog.date_of_entry}
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{
                      fontFamily: "'Michroma', sans-serif",
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
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
                    fontFamily: "'Michroma', sans-serif",
                    textAlign: 'center',
                    fontStyle: 'italic',
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
