import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from '@mui/material'
import axios from 'axios'

export default function EditInterests({ isEditBtnClicked, handleClick, interests, id, getAboutMe, aboutMe }) {
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
          <Typography variant="caption" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
            Separate interests with commas
          </Typography>
        </Box>
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

