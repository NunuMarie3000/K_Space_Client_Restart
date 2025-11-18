// will display blog posts for individual user
// this is where they can add new posts
// get all existing posts
// delete posts
// and edit posts
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Box, Container, Typography, Card, CardContent, CircularProgress } from '@mui/material'
import BlogEntry from '../body/blog/BlogEntry'
import AddBlogEntry from '../body/blog/edit/AddBlogEntry'
import Footer from '../body/Footer'

export default function EditBlog() {
  const [blogs, setBlogs] = useState('')
  const location = useLocation()
  const userLayout = useSelector((state) => state.userData.userLayout)
  const userId = useSelector((state) => state.userData.userId)
  const autoEditBlogId = location.state?.blogId
  const shouldAutoEdit = location.state?.autoEdit === true

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
    const glassmorphismStyle = {
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(10px) saturate(180%)',
      WebkitBackdropFilter: 'blur(10px) saturate(180%)',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    }
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
          Edit Blog Posts
        </Typography>

        {blogs !== '' && (
          <AddBlogEntry 
            getBlogs={getBlogs} 
            author={blogs.length > 0 ? blogs[0].author : userId} 
          />
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
          {blogs !== '' && blogs.length > 0 ? (
            blogs.map(blog =>
              <BlogEntry 
                key={blog._id} 
                getBlogs={getBlogs} 
                blogId={blog._id} 
                authorId={blog.author} 
                title={blog.title} 
                date_of_entry={blog.date_of_entry} 
                date_of_update={blog.date_of_update} 
                body={blog.body}
                autoEdit={shouldAutoEdit && blog._id === autoEditBlogId}
              />
            )
          ) : (
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px) saturate(180%)',
                WebkitBackdropFilter: 'blur(10px) saturate(180%)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                p: 3,
                textAlign: 'center',
              }}
            >
              <Typography 
                variant="body1"
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                  fontStyle: 'italic',
                }}
              >
                No blog posts yet. Create your first post!
              </Typography>
            </Box>
          )}
        </Box>
        
        <Footer />
      </Container>
    </Box>
  )
}
