import axios from 'axios'
import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useSelector } from 'react-redux'
import { modalPaperStyle, modalTitleStyle, modalTextFieldStyle, modalButtonStyle, getModalPrimaryButtonStyle } from '../../../../styles'

export default function EditModal({ editMode, toggleEditMode, blogId, authorId, title, body, date_of_entry, getBlogs }) {
  const userLayout = useSelector((state) => state.userData.userLayout)
  const [updatedTitle, setTitle] = useState('')
  const [updatedBody, setBody] = useState('')

  const handleClose = () => {
    toggleEditMode()
  }

  const checkFirst = () => {
    let titleUpdate
    let bodyUpdate
    // checking first, if the title or body isn't changed, i need to send back og value
    if(updatedTitle !==''){
      titleUpdate = updatedTitle
    }else{titleUpdate = title}
    if(updatedBody !== ''){
      bodyUpdate = updatedBody
    }else{bodyUpdate = body}
    
    // need title, body, and date_of_entry
    const updatedBlogEntry = {
      title: titleUpdate,
      body: bodyUpdate,
      date_of_entry: date_of_entry
    }
    return updatedBlogEntry
  }

  const handleSubmit = async (e) => {
    // when an update is made, i need to make put request to server, server/:user/entries/:id
    // const userId=authorId
    const blog=blogId
    const url=`${process.env.REACT_APP_SERVER}entry/${blog}`
    
    try {
      e.preventDefault()
      const body = checkFirst()
      await axios.put(url, body)
      handleClose()
      // i'll also need to make whatever call i need to get all of the blogs back from server
      getBlogs()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <IconButton 
        onClick={toggleEditMode}
        size="small"
        sx={{
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <Dialog 
        open={editMode} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: modalPaperStyle
        }}
      >
        <DialogTitle sx={modalTitleStyle}>
          Edit Post
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              sx={modalTextFieldStyle}
            />
            <TextField
              fullWidth
              label="Body"
              defaultValue={body}
              onChange={(e) => setBody(e.target.value)}
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
    </>
  )
}