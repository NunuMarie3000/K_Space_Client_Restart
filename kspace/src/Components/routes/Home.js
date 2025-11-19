import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditButton from '../layout/EditButton'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Container, Box, CircularProgress, Alert, Typography, Card, CardContent } from '@mui/material'
import {
  glassmorphismStyle,
  appColors,
  getCustomGradient,
  getTextColor,
  getHeadingStyle,
  getBodyTextStyle,
} from '../../styles'

export default function Home() {
  const location = useLocation()
  const data = location.state
  const userLayoutFromRedux = useSelector((state) => state.userData.userLayout)
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
    // Use userLayout from Redux if available (should be there if navigating from another page)
    const userLayout = userLayoutFromRedux || layout
    
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: getCustomGradient(userLayout),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
          color: getTextColor(userLayout),
        }}
      >
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
                sx={getHeadingStyle(userLayout, 'h1')}
              >
                Loading...
              </Typography>
              <Typography 
                variant="body2" 
                sx={{
                  ...getBodyTextStyle(userLayout, {
                    fontStyle: 'italic',
                    opacity: 0.8,
                  }),
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
