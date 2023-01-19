// this is gonna display the latest blog post, link to all the users' other public posts, 
import React from 'react'
import Latest from './Latest'
// import { Link } from 'react-router-dom'

export default function MainBlog({ blogs }) {
  return (
    <>
      <div className='main-latest-blog' style={{border:'2px solid black', borderRadius:'2%/5%'}}>
        <h4 style={{textAlign:'center', fontFamily:"'Michroma', sans-serif"}}>My Latest blog entry</h4>
        <Latest blogs={blogs}/>
        {/* <Link to='/blog'>[View Blog]</Link> */}
      </div>
    </>
  )
}