import React from 'react'
import Header from '../header/Header'
import { Outlet, Link } from 'react-router-dom'

export default function Navigation({ userLayout, logout }) {
  return (
    <>
      <Header userLayout={userLayout} logout={logout} />

      <div className='navigation-container'>
          <nav>
            <Link to='/'>Home</Link> | {' '}
            <Link state={userLayout} to='/blog'>Blog</Link> | {' '}
            <Link state={userLayout} to='/editblog'>Edit Blog</Link> | {' '}
            <Link state={userLayout} to='/about'>About</Link>
          </nav>
        <Outlet />
      </div>
    </>
  )
}