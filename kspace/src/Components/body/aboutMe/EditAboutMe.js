import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material'
import axios from 'axios'
import { modalPaperStyle, modalTitleStyle, modalTextFieldStyle, modalButtonStyle, getModalPrimaryButtonStyle, getBodyTextStyle } from '../../../styles'

export default function EditAboutMe({ isEditBtnClicked, handleClick, aboutMe, id, getAboutMe }) {
  const userLayout = useSelector((state) => state.userData.userLayout)
  const [updatedAboutMe, setUpdate] = useState('')
  const [updatedImage, setImage] = useState('')
  const [updatedAlt, setAlt] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = id
    const url = `${process.env.REACT_APP_SERVER}aboutme/${userId}`
    
    let sendMe
    let sendImg
    let sendAlt
    if(updatedAboutMe === ''){
      sendMe = aboutMe.about_me
    }else{sendMe = updatedAboutMe}
    if(updatedImage === ''){
      sendImg = aboutMe.image
    }else{sendImg = updatedImage}
    if(updatedAlt === ''){
      sendAlt = aboutMe.alt
    }else{sendAlt = updatedAlt}

    const newBody = { 
      user: userId, 
      about_me: sendMe, 
      image: sendImg, 
      alt: sendAlt,
      interests: aboutMe.interests // Preserve interests
    }
    
    try {
      await axios.put(url, newBody)
      getAboutMe()
      handleClick()
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Dialog 
      open={isEditBtnClicked} 
      onClose={handleClick}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: modalPaperStyle
      }}
    >
      <DialogTitle sx={modalTitleStyle}>
        Edit About Me
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="About Me"
            defaultValue={aboutMe.about_me}
            onChange={(e) => setUpdate(e.target.value)}
            multiline
            rows={4}
            margin="normal"
            sx={modalTextFieldStyle}
          />
          <TextField
            fullWidth
            label="About Me Image URL"
            defaultValue={aboutMe.image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image url: http://www.example.com/image.jpg"
            margin="normal"
            sx={modalTextFieldStyle}
          />
          <TextField
            fullWidth
            label="Image Alt Text"
            defaultValue={aboutMe.alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="What is this an image of?"
            margin="normal"
            sx={modalTextFieldStyle}
          />
          <Typography 
            variant="caption" 
            sx={{
              ...getBodyTextStyle(userLayout, {
                mt: 1,
                display: 'block',
                fontStyle: 'italic',
                opacity: 0.8,
              }),
            }}
          >
            What is this an image of?
          </Typography>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={handleClick}
          sx={modalButtonStyle}
        >
          Cancel
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