import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
// this is where i'll get all my blogs for this user, won't be editable here, this will be public facing

export default function PublicBlog() {
  const [blogs, setBlogs] = useState('')

  const getBlogs = async () => {
    const userId = process.env.REACT_APP_MY_ID
    const url = `${process.env.REACT_APP_SERVER}${userId}/entries`
    try {
      const response = await axios.get(url)
      setBlogs(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getBlogs()
  })

  return (
    <> 
      <h1>My Blog Posts</h1>
      {blogs !== '' && blogs.map(blog => <Card>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Posted: {blog.date_of_entry}</Card.Subtitle>
          <Card.Text>{blog.body}
          </Card.Text>
        </Card.Body>
      </Card>)}
    </>
  )
}