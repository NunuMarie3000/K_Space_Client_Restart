import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import { modalPaperStyle, modalTitleStyle, modalTextFieldStyle, modalButtonStyle, getModalPrimaryButtonStyle } from '../../../../styles'
// here is where i make post request to server to create new blog entry
// perhaps another modal

export default function NewBlogEntry({ isAddBtnClicked, handleClick, author, getBlogs }) {
  const userLayout = useSelector((state) => state.userData.userLayout)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleClose = () => {
    handleClick()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = `${process.env.REACT_APP_SERVER}${author}/entry`
    // i need title, body, authorId

    const newPost = {
      title: title,
      body: body
    }
    try {
      await axios.post(url, newPost)
      getBlogs()
      handleClose()
      // Reset form
      setTitle('')
      setBody('')
      // call whatever function that gets all posts
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Dialog 
      open={isAddBtnClicked} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: modalPaperStyle
      }}
    >
      <DialogTitle sx={modalTitleStyle}>
        New Post
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="I made art today..."
            required
            margin="normal"
            sx={modalTextFieldStyle}
          />
          <TextField
            fullWidth
            label="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="I crafted a beautiful painting!"
            required
            multiline
            rows={4}
            margin="normal"
            sx={modalTextFieldStyle}
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={handleClose}
          sx={modalButtonStyle}
        >
          Close
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          sx={getModalPrimaryButtonStyle(userLayout)}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}