import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material'
import axios from 'axios'

export default function EditAboutMe({ isEditBtnClicked, handleClick, aboutMe, id, getAboutMe }) {
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
        sx: {
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px) saturate(180%)',
          WebkitBackdropFilter: 'blur(10px) saturate(180%)',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }
      }}
    >
      <DialogTitle sx={{ fontFamily: "'Michroma', sans-serif", fontWeight: 'bold' }}>
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
            sx={{
              '& .MuiOutlinedInput-root': {
                fontFamily: "'Michroma', sans-serif",
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(5px)',
                '& fieldset': {
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                },
                '&:hover fieldset': {
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="About Me Image URL"
            defaultValue={aboutMe.image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image url: http://www.example.com/image.jpg"
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                fontFamily: "'Michroma', sans-serif",
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(5px)',
                '& fieldset': {
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                },
                '&:hover fieldset': {
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Image Alt Text"
            defaultValue={aboutMe.alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="What is this an image of?"
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                fontFamily: "'Michroma', sans-serif",
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(5px)',
                '& fieldset': {
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                },
                '&:hover fieldset': {
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                },
              },
            }}
          />
          <Typography variant="caption" sx={{ mt: 1, display: 'block', fontStyle: 'italic', color: 'text.secondary' }}>
            What is this an image of?
          </Typography>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={handleClick}
          sx={{
            fontFamily: "'Michroma', sans-serif",
            color: 'text.primary',
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          sx={{
            fontFamily: "'Michroma', sans-serif",
            background: 'linear-gradient(135deg, rgba(135, 206, 250, 0.6) 0%, rgba(144, 238, 144, 0.6) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            color: 'text.primary',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(135, 206, 250, 0.8) 0%, rgba(144, 238, 144, 0.8) 100%)',
            },
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}