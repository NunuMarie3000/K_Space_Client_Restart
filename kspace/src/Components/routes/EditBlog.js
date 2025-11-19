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
import {
  glassmorphismStyle,
  pageContainer,
  appColors,
  getCustomGradient,
  getHeadingStyle,
  getBodyTextStyle,
  getTextColor,
} from '../../styles'

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
                ...glassmorphismStyle,
                p: 3,
                textAlign: 'center',
              }}
            >
              <Typography 
                variant="body1"
                sx={{
                  ...getBodyTextStyle(userLayout, {
                    fontStyle: 'italic',
                  }),
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
