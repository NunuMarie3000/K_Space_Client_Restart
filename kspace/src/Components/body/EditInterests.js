import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from '@mui/material'
import axios from 'axios'
import { modalPaperStyle, modalTitleStyle, modalTextFieldStyle, modalButtonStyle, getModalPrimaryButtonStyle, getBodyTextStyle } from '../../styles'

export default function EditInterests({ isEditBtnClicked, handleClick, interests, id, getAboutMe, aboutMe }) {
  const userLayout = useSelector((state) => state.userData.userLayout)
  const [updatedInterests, setInterests] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = id
    const url = `${process.env.REACT_APP_SERVER}aboutme/${userId}`
    
    // Convert comma-separated string to array, or use existing interests if empty
    let sendInt
    if (updatedInterests === '') {
      sendInt = interests
    } else {
      sendInt = updatedInterests.split(',').filter(e => e.trim())
    }

    // Update interests field while preserving other aboutMe fields
    const newBody = {
      user: userId,
      about_me: aboutMe?.about_me || '',
      image: aboutMe?.image || '',
      alt: aboutMe?.alt || '',
      interests: sendInt
    }

    try {
      await axios.put(url, newBody)
      getAboutMe()
      handleClick()
    } catch (error) {
      console.log(error.message)
    }
  }

  // Convert interests array to comma-separated string for input
  const interestsString = Array.isArray(interests) ? interests.join(', ') : ''

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
        Edit Interests
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Interests"
            defaultValue={interestsString}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Separate interests with commas"
            multiline
            rows={3}
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
            Separate interests with commas
          </Typography>
        </Box>
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

