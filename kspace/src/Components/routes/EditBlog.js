// will display blog posts for individual user
// this is where they can add new posts
// get all existing posts
// delete posts
// and edit posts
import React, { Component } from 'react'
import Navigation from '../body/Navigation'
import axios from 'axios'
import BlogEntry from '../body/blog/BlogEntry'
import AddBlogEntry from '../body/blog/edit/AddBlogEntry'

export default class EditBlog extends Component {
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
      await axios.get(url).then(res=>this.setState({blogs:res.data}))
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

        {blogs !== '' && <AddBlogEntry getBlogs={this.getBlogs} author={this.state.blogs[0].author} />}
        
        <div style={{ border: '2px solid black' }}>
        {blogs !== '' && blogs.map(blog => 
        <BlogEntry getBlogs={this.getBlogs} blogId={blog._id} authorId={blog.author} title={blog.title} date_of_entry={blog.date_of_entry} date_of_update={blog.date_of_update} body={blog.body} />)}
        </div>
      </>
    )
  }
}