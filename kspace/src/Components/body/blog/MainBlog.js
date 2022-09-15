// this is gonna display the latest blog post, link to all the users' other public posts, 
import React from 'react'
import Latest from './Latest'
import { Link } from 'react-router-dom'

export default function MainBlog({ blogs }) {
  return (
    <>
      <div className='main-latest-blog' style={{border:'2px solid black'}}>
        <h4>Name's latest blog entries</h4>
        <Link to='/blog'>[View Blog]</Link>
        <Latest blogs={blogs}/>
      </div>
    </>
  )
}