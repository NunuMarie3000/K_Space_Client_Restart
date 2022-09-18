// will display blog posts for individual user
// this is where they can add new posts
// get all existing posts
// delete posts
// and edit posts
import React, { useState, useEffect} from 'react'
import axios from 'axios'
import BlogEntry from '../body/blog/BlogEntry'
import AddBlogEntry from '../body/blog/edit/AddBlogEntry'
import { useLocation } from 'react-router-dom'
import Footer from '../body/Footer'

export default function EditBlog() {
  const [blogs, setBlogs] = useState('')
  const location = useLocation()
  const layout = location.state

  const getBlogs = async () => {
    const userId = layout.user
    const url = `${process.env.REACT_APP_SERVER}${userId}/entries`
    try {
      await axios.get(url).then(res => setBlogs(res.data))
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    getBlogs()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <div style={{
            backgroundColor: layout ? layout.backColor : '#fff',
            backgroundImage: layout ? `url(${layout.backImage})` : 'none',
            color: layout ? layout.fontBodyColor : 'black',
            height:'100%',
            padding: '10px 15px 0 15px'
          }}>

          {blogs !== '' && <AddBlogEntry getBlogs={getBlogs} author={blogs[0].author} />}

          <div>
            {blogs !== '' && blogs.map(blog =>
              <BlogEntry getBlogs={getBlogs} blogId={blog._id} authorId={blog.author} title={blog.title} date_of_entry={blog.date_of_entry} date_of_update={blog.date_of_update} body={blog.body} />)}
          </div>
          <Footer/>
        </div>
    </>
  )
}
