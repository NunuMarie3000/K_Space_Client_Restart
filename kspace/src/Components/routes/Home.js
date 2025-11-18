import React, { useEffect, useState } from 'react'
import EditButton from '../layout/EditButton'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Container, Box, CircularProgress, Alert, Typography, Card, CardContent } from '@mui/material'

export default function Home() {
  const location = useLocation()
  const data = location.state
  const [layout, setLayout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getLayout = async (layoutid) => {
    if (!layoutid) {
      setError('No layout ID provided')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    const url = `${process.env.REACT_APP_SERVER}layout/${layoutid}`
    try {
      const response = await axios.get(url)
      if (response.data && response.data[0]) {
        setLayout(response.data[0])
      } else {
        setError('Layout not found')
      }
    } catch (error) {
      console.error('Error fetching layout:', error.message)
      setError(error.response?.data?.message || 'Failed to load layout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!data) {
      setError('Unable to load user data. Please try navigating from the home page.')
      setLoading(false)
      return
    }

    const layoutId = data?.userLayoutId
    if (layoutId) {
      getLayout(layoutId)
    } else {
      setError('No layout ID available')
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.userLayoutId])

  // Handle case where data might not be available
  if (!data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          <Typography variant="h6">Error</Typography>
          Unable to load user data. Please try navigating from the home page.
        </Alert>
      </Container>
    )
  }

  const userFromAuth = {
    email: data.email, 
    email_verified: data.email_verified,
    name: data.name,
    nickname: data.nickname,
    picture: data.picture,
    sub: data.sub,
    updated_at: data.updated_at
  }

  if (loading) {
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
                  mb: 1,
                }}
              >
                Loading...
              </Typography>
              <Typography 
                variant="body2" 
                sx={{
                  fontFamily: "'Michroma', sans-serif",
                  color: 'rgba(0, 0, 0, 0.7)',
                }}
              >
                Loading your homepage...
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>Error Loading Page</Typography>
          {error}
        </Alert>
      </Container>
    )
  }

  if (!layout) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          <Typography variant="h6">No Layout Found</Typography>
          Unable to find layout configuration. Please contact support.
        </Alert>
      </Container>
    )
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <EditButton USERID={layout.user} userInfoAuth={userFromAuth} userLayout={layout} />
    </Box>
  )
}
