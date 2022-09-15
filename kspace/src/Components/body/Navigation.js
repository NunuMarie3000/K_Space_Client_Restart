import React from 'react'
import Header from '../header/Header'
import { Outlet, Link } from 'react-router-dom'

export default function Navigation({ username }) {
  return (
    <>
      <Header />

      <div className='navigation-container'>
          <nav>
            <Link to='/'>Home</Link> | {' '}
            <Link to='/blog'>Blog</Link> | {' '}
            <Link to='/editblog'>Edit Blog</Link> | {' '}
            <Link to='/about'>About</Link>
          </nav>
        {/* <Navbar>
        <Navbar.Brand>K_Space</Navbar.Brand>
        <Nav>
          <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/blog'>
            <Nav.Link>Blog</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/editblog'>
            <Nav.Link>Edit Blog</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/about'>
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar> */}
        <Outlet />
      </div>
    </>
  )
}