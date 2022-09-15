// this will have clickable for chatroom (stretch goal)
// page url, so others can view this page
// view blog = clicable to the user's blog, public facing, so...user/blog? or/blog?
import React from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <>
      <div className='contact-container' style={{ border: '2px solid black', display:'flex', flexDirection:'column'}}>
        <div>
          <i className="fa-solid fa-message"></i>Send Message
        </div>
        {/*eslint-disable-next-line */}
        <Link to='/'>Page Url</Link>
        <Link to='/blog'>[View Blog]</Link>
      </div>
    </>
  )
}