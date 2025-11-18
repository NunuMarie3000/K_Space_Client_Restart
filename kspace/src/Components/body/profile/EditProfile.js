import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material'
import axios from 'axios'

export default function EditProfile({ isEditBtnClicked, handleClick, profile, mood, id, getProfile, profilePic, username, authProfilePic, authUsername }) {
  const [updatedProfile, setUpdate] = useState('')
  const [updatedMood, setMood] = useState('')
  const [updatedProfilePic, setProfilePic] = useState('')
  const [updatedUsername, setUsername] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = id
    const url = `${process.env.REACT_APP_SERVER}profile/${userId}`
    let sendMood
    let sendProfile
    let sendPic
    let sendUsername

    if (updatedProfile === '') { sendProfile = profile } else { sendProfile = updatedProfile }
    if (updatedMood === '') { sendMood = mood } else { sendMood = updatedMood }
    if (updatedProfilePic === '') { sendPic = profilePic } else { sendPic = updatedProfilePic }
    if (updatedUsername === '') { sendUsername = username } else { sendUsername = updatedUsername }

    const newBody = {
      user: userId,
      profile: sendProfile,
      mood: sendMood,
      profilePic: sendPic,
      username: sendUsername
    }
    try {
      await axios.put(url, newBody)
      getProfile()
      handleClick()
    } catch (error) {
      console.log(error.message)
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
        Edit Profile
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Profile Bio"
            defaultValue={profile}
            onChange={(e) => setUpdate(e.target.value)}
            multiline
            rows={3}
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
            label="Profile Picture URL"
            defaultValue={profilePic ? profilePic : authProfilePic}
            onChange={(e) => setProfilePic(e.target.value)}
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
            label="Username"
            defaultValue={username ? username : authUsername}
            onChange={(e) => setUsername(e.target.value)}
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
            label="Mood"
            defaultValue={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="How are you feeling?"
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