import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserLayout } from '../../store/userDataSlice'
import axios from 'axios'
import { modalPaperStyle, modalTitleStyle, modalTextFieldStyle, modalButtonStyle, getModalPrimaryButtonStyle } from '../../styles'

export default function EditHero({ isEditBtnClicked, handleClick }) {
  const dispatch = useDispatch()
  const userLayout = useSelector((state) => state.userData.userLayout)
  const [hero1, setHeroImg1] = useState('')
  const [hero2, setHeroImg2] = useState('')
  const [hero1Alt, setAlt1] = useState('')
  const [hero2Alt, setAlt2] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userLayout) return
    
    const userId = userLayout.user
    const url = `${process.env.REACT_APP_SERVER}layout/${userId}`

    // Only update hero image fields, keep other layout fields unchanged
    const updatedLayout = {
      heroImg1: hero1 === '' ? userLayout.heroImg1 : hero1,
      heroImg2: hero2 === '' ? userLayout.heroImg2 : hero2,
      heroImg1Alt: hero1Alt === '' ? userLayout.heroImg1Alt : hero1Alt,
      heroImg2Alt: hero2Alt === '' ? userLayout.heroImg2Alt : hero2Alt
    }

    const toSend = {
      backColor: userLayout.backColor,
      backImage: userLayout.backImage,
      fontBodyColor: userLayout.fontBodyColor,
      ...updatedLayout
    }

    try {
      await axios.put(url, toSend)
      // Update Redux state instead of reloading
      dispatch(updateUserLayout(updatedLayout))
      handleClick()
    } catch (error) {
      console.error(error.message)
    }
  }

  if (!userLayout) return null

  const { heroImg1, heroImg1Alt, heroImg2, heroImg2Alt } = userLayout

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
        Edit Hero Images
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Hero Image 1 URL"
            defaultValue={heroImg1}
            onChange={(e) => setHeroImg1(e.target.value)}
            placeholder="Image url: http://www.example.com/image.jpg"
            margin="normal"
            sx={modalTextFieldStyle}
          />
          <TextField
            fullWidth
            label="Hero Image 1 Alt Text"
            defaultValue={heroImg1Alt}
            onChange={(e) => setAlt1(e.target.value)}
            placeholder="This is a picture of..."
            margin="normal"
            sx={modalTextFieldStyle}
          />
          <TextField
            fullWidth
            label="Hero Image 2 URL"
            defaultValue={heroImg2}
            onChange={(e) => setHeroImg2(e.target.value)}
            placeholder="Image url: http://www.example.com/image.jpg"
            margin="normal"
            sx={modalTextFieldStyle}
          />
          <TextField
            fullWidth
            label="Hero Image 2 Alt Text"
            defaultValue={heroImg2Alt}
            onChange={(e) => setAlt2(e.target.value)}
            placeholder="This is a picture of..."
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

