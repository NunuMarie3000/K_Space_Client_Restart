import React from 'react'
import Header from '../header/Header'
import { Outlet, Link } from 'react-router-dom'
import { Box } from '@mui/material'
import { getCustomGradient, typography, getTextColor } from '../../styles'

export default function Navigation({ userLayout, logout, userInfoAuth, userId }) {
  const dataForHome = {
    ...userInfoAuth,
    userLayoutId:userLayout.user,
  }

  // Frutiger Aero gradient background
  const frutigerAeroGradient = getCustomGradient(userLayout)

  return (
    <Box
      sx={{
        ...typography,
        background: frutigerAeroGradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: getTextColor(userLayout),
        pt: { xs: 1, sm: 1.5, md: 2 },
        pb: { xs: 0, sm: 0, md: 0 },
        px: { xs: 1, sm: 1.5, md: 2 },
      }}
    >
      <Header userLayout={userLayout} logout={logout} />

      <Box
        className='navigation-container'
        sx={{
          mt: { xs: 0.5, sm: 0.75, md: 0.75 },
        }}
      >
        <Box
          component="nav"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: { xs: '14px', sm: '16px' },
            fontWeight: 800,
            ...typography,
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Link 
            style={{
              color: getTextColor(userLayout),
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.25)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              e.target.style.transform = 'translateY(0)'
            }}
            state={dataForHome} 
            to='/home'
          >
            Home
          </Link>
          <Link 
            style={{
              color: getTextColor(userLayout),
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.25)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              e.target.style.transform = 'translateY(0)'
            }}
            state={userLayout} 
            to='/blog'
          >
            Blog
          </Link>
          <Link 
            style={{
              color: getTextColor(userLayout),
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.25)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              e.target.style.transform = 'translateY(0)'
            }}
            state={userLayout} 
            to='/editblog'
          >
            Edit Blog
          </Link>
          <Link 
            style={{
              color: getTextColor(userLayout),
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.25)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              e.target.style.transform = 'translateY(0)'
            }}
            to='/about'
          >
            About
          </Link>
        </Box>
        <Outlet />
      </Box>
    </Box>
  )
}