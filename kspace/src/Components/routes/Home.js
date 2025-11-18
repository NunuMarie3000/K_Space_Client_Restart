import React, { useEffect, useState } from 'react'
import EditButton from '../layout/EditButton'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Container, Box, CircularProgress, Alert, Typography } from '@mui/material'

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
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={60} />
          <Typography variant="body1" color="text.secondary">
            Loading your homepage...
          </Typography>
        </Box>
      </Container>
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
