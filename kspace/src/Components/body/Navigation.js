import React from 'react'
import Header from '../header/Header'
import { Outlet, Link } from 'react-router-dom'
import { Box } from '@mui/material'

export default function Navigation({ userLayout, logout, userInfoAuth, userId }) {
  // console.log(userId)
  // if (!userLayout || !userLayout.user) {
  //   return <div>Loading...</div>
  // }
  console.log(userInfoAuth)
  console.log('userLayout: ', userLayout)
  // home route can only be passed one object via state
  // needs userLayout, getLayout, and userInfoAuth
  // but i can also copy and paste getLayout function
  // console.log(userLayout)
  const dataForHome = {
    ...userInfoAuth,
    userLayoutId:userLayout.user,
  }

  // Frutiger Aero gradient background
  const frutigerAeroGradient = userLayout?.backImage 
    ? `linear-gradient(135deg, rgba(135, 206, 250, 0.3) 0%, rgba(144, 238, 144, 0.3) 50%, rgba(173, 216, 230, 0.3) 100%), url(${userLayout.backImage})`
    : userLayout?.backColor 
      ? `linear-gradient(135deg, rgba(135, 206, 250, 0.2) 0%, rgba(144, 238, 144, 0.2) 50%, rgba(173, 216, 230, 0.2) 100%), ${userLayout.backColor}`
      : 'linear-gradient(135deg, #87CEEB 0%, #90EE90 50%, #ADD8E6 100%)'

  return (
    <Box
      sx={{
        fontFamily: "'Michroma', sans-serif",
        background: frutigerAeroGradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: userLayout ? userLayout.fontBodyColor : 'black',
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
            fontFamily: "'Michroma', sans-serif",
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Link 
            style={{
              color: userLayout ? userLayout.fontBodyColor : 'black',
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
              color: userLayout ? userLayout.fontBodyColor : 'black',
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
              color: userLayout ? userLayout.fontBodyColor : 'black',
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
              color: userLayout ? userLayout.fontBodyColor : 'black',
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