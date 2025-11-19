import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { modalPaperStyle, modalTitleStyle, modalTextFieldStyle, modalButtonStyle, getModalPrimaryButtonStyle } from '../../../styles'

export default function EditProfile({ isEditBtnClicked, handleClick, profile, mood, id, getProfile, profilePic, username, authProfilePic, authUsername }) {
  const userLayout = useSelector((state) => state.userData.userLayout)
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
        sx: modalPaperStyle
      }}
    >
      <DialogTitle sx={modalTitleStyle}>
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
            sx={modalTextFieldStyle}
          />
          <TextField
            fullWidth
            label="Profile Picture URL"
            defaultValue={profilePic ? profilePic : authProfilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            placeholder="Image url: http://www.example.com/image.jpg"
            margin="normal"
            sx={modalTextFieldStyle}
          />
          <TextField
            fullWidth
            label="Username"
            defaultValue={username ? username : authUsername}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            sx={modalTextFieldStyle}
          />
          <TextField
            fullWidth
            label="Mood"
            defaultValue={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="How are you feeling?"
            margin="normal"
            sx={modalTextFieldStyle}
          />
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