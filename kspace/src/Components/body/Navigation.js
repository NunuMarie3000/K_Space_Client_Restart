import React from 'react'
import Header from '../header/Header'
import { Outlet, Link } from 'react-router-dom'

export default function Navigation({ userLayout, logout, userInfoAuth }) {
  // home route can only be passed one object via state
  // needs userLayout, getLayout, and userInfoAuth
  // but i can also copy and paste getLayout function
  const dataForHome = { ...userInfoAuth, ...userLayout}
  return (
    <>
      <div style={{
        fontFamily: "'Michroma', sans-serif",
        backgroundColor: userLayout ? userLayout.backColor : '#fff',
        backgroundImage: userLayout ? `url(${userLayout.backImage})` : 'none',
        color: userLayout ? userLayout.fontBodyColor : 'black',
        height: '100%',
        padding: '10px 15px 0 15px'
      }}>
        <Header userLayout={userLayout} logout={logout} />

        <div className='navigation-container'>
          <nav>
          <Link state={dataForHome} to='/home'>Home</Link> | {' '}
            <Link state={userLayout} to='/blog'>Blog</Link> | {' '}
            <Link state={userLayout} to='/editblog'>Edit Blog</Link> | {' '}
            <Link state={userLayout} to='/about'>About</Link>
          </nav>
          <Outlet />
        </div>
      </div>
    </>
  )
}