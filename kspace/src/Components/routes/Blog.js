import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Navigation from '../body/Navigation'
import Footer from '../body/Footer'
// this is where i'll get all my blogs for this user, won't be editable here, this will be public facing

export default function Blog() {
  const [blogs, setBlogs] = useState('')
  const location = useLocation()
  const layout = location.state

  const getBlogs = async () => {
    const userId = process.env.REACT_APP_MY_ID
    const url = `${process.env.REACT_APP_SERVER}${userId}/entries`
    try {
      await axios.get(url).then(res => setBlogs(res.data ))

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    getBlogs()
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
        <Navigation/>
        <h1 style={{fontFamily:"'Michroma', sans-serif"}}>Blog Posts</h1>
        {blogs !== '' && blogs.map(blog => <Card style={{marginBottom:'1rem'}}>
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Posted: {blog.date_of_entry}</Card.Subtitle>
            <Card.Text>{blog.body}
            </Card.Text>
          </Card.Body>
        </Card>)}
        <Footer/>
        </div>
    </>
  )
}
