import React, { Component } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import Navigation from '../body/Navigation'
// this is where i'll get all my blogs for this user, won't be editable here, this will be public facing

export default class Blog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blogs: ''
    }
  }

  getBlogs = async () => {
    const userId = process.env.REACT_APP_MY_ID
    const url = `${process.env.REACT_APP_SERVER}${userId}/entries`
    try {
      await axios.get(url).then(res => this.setState({ blogs: res.data }))

    } catch (error) {
      console.log(error.message)
    }
  }

  componentDidMount = () => {
    this.getBlogs()
  }

  render() {
    const { blogs } = this.state
    return (
      <>
        <Navigation/>
        <h1>'s Blog Posts</h1>
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
}