import axios from 'axios'
import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserLayout } from '../../store/userDataSlice'
import { modalPaperStyle, modalTitleStyle, modalTextFieldStyle, modalButtonStyle, getModalPrimaryButtonStyle } from '../../styles'

export default function EditLayoutModal({ isEditBtnClicked, handleClick }) {
  const dispatch = useDispatch()
  const userLayout = useSelector((state) => state.userData.userLayout)
  const [backgroundColor, setBackgroundColor] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [bodyColor, setBodyColor] = useState(null)

  if (!userLayout) return null

  const checkValues = (e) => {
    let sendBC
    let sendBI
    let sendBody
    // If state is null, user hasn't changed the field - keep existing value
    // If state is empty string, user explicitly cleared it - set to null/empty
    // If state has value, user changed it - use new value
    if (backgroundColor === null) {
      sendBC = userLayout.backColor
    } else {
      sendBC = backgroundColor.trim() === '' ? null : backgroundColor.trim()
    }
    if (backgroundImage === null) {
      sendBI = userLayout.backImage
    } else {
      // If user cleared the field (empty string), explicitly set to null to remove image
      sendBI = backgroundImage.trim() === '' ? null : backgroundImage.trim()
    }
    if (bodyColor === null) {
      sendBody = userLayout.fontBodyColor
    } else {
      sendBody = bodyColor.trim() === '' ? null : bodyColor.trim()
    }

    return {
      backColor: sendBC, 
      backImage: sendBI, 
      fontBodyColor: sendBody,
      heroImg1: userLayout.heroImg1, 
      heroImg2: userLayout.heroImg2, 
      heroImg1Alt: userLayout.heroImg1Alt, 
      heroImg2Alt: userLayout.heroImg2Alt
    }
  }

  // this needs to make put request to /layout/:user
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userLayout) return
    
    const userId = userLayout.user
    const url = `${process.env.REACT_APP_SERVER}layout/${userId}`
    try {
      // this will return an object
      const toSend = checkValues(e)
      console.log(toSend)
      await axios.put(url, toSend)
      
      // Update Redux state instead of reloading
      const updatedLayout = {
        backColor: toSend.backColor,
        backImage: toSend.backImage,
        fontBodyColor: toSend.fontBodyColor,
      }
      dispatch(updateUserLayout(updatedLayout))
      handleClick()
    } catch (error) {
      console.log(error.message)
    }
  }
  const { backColor, backImage, fontBodyColor } = userLayout
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
        Edit Layout
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Background Color"
            defaultValue={backColor}
            placeholder="Hex code: #fff"
            onChange={(e) => setBackgroundColor(e.target.value)}
            margin="normal"
            sx={modalTextFieldStyle}
          />
          <TextField
            fullWidth
            label="Background Image"
            defaultValue={backImage || ''}
            placeholder="Image url: http://www.example.com/image.jpg (leave empty to remove)"
            onChange={(e) => setBackgroundImage(e.target.value)}
            margin="normal"
            sx={modalTextFieldStyle}
            helperText="Leave empty to remove background image"
          />
          <TextField
            fullWidth
            label="Text Color: Body"
            defaultValue={fontBodyColor}
            placeholder="Hex code: #fff"
            onChange={(e) => setBodyColor(e.target.value)}
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