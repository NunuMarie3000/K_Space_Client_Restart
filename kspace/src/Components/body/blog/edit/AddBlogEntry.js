import React, { useState } from 'react'
import NewBlogEntry from './NewBlogEntry'

export default function AddBlogEntry( { author, getBlogs }) {
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false)

  const handleClick = () => {
    setIsAddBtnClicked(!isAddBtnClicked)
  }

  return (
    <>
      {isAddBtnClicked ? <NewBlogEntry getBlogs={getBlogs} handleClick={handleClick} isAddBtnClicked={isAddBtnClicked} author={author} /> : <button style={{margin: '5px 0'}} onClick={handleClick}>New Post</button>}
    </>
  )
}