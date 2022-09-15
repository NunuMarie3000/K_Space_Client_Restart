import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import NewBlogEntry from './NewBlogEntry'

export default function AddBlogEntry( { author, getBlogs }) {
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false)

  const handleClick = () => {
    setIsAddBtnClicked(!isAddBtnClicked)
  }

  return (
    <>
      {isAddBtnClicked ? <NewBlogEntry getBlogs={getBlogs} handleClick={handleClick} isAddBtnClicked={isAddBtnClicked} author={author} /> : <Button onClick={handleClick}>New Post</Button>}
    </>
  )
}