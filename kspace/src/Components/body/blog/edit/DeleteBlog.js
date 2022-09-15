import axios from 'axios'
import React from 'react'

export default function DeleteBlog({ blogId, authorId, getBlogs }) {

  const handleDelete = async()=>{
    // :user/entry/:id
    const url = `${process.env.REACT_APP_SERVER}entry/${blogId}`
    try {
      await axios.delete(url)
      getBlogs()
      console.log(url)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <i onClick={handleDelete} className="fa-solid fa-trash-can"></i>
    </>
  )
}