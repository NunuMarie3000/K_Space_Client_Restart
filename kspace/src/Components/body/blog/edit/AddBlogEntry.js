import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Box } from '@mui/material'
import NewBlogEntry from './NewBlogEntry'
import { getChipGradient, typography, getTextColor } from '../../../../styles'

export default function AddBlogEntry( { author, getBlogs }) {
  const userLayout = useSelector((state) => state.userData.userLayout)
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false)
  const chipGradient = getChipGradient(userLayout, 0.6)
  const hoverGradient = getChipGradient(userLayout, 0.8)

  const handleClick = () => {
    setIsAddBtnClicked(!isAddBtnClicked)
  }

  return (
    <Box sx={{ mb: 2 }}>
      {isAddBtnClicked ? (
        <NewBlogEntry 
          getBlogs={getBlogs} 
          handleClick={handleClick} 
          isAddBtnClicked={isAddBtnClicked} 
          author={author} 
        />
      ) : (
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            ...typography,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 600,
            background: chipGradient,
            border: '1px solid rgba(255, 255, 255, 0.5)',
            color: getTextColor(userLayout),
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '12px',
            textTransform: 'none',
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.25 },
            '&:hover': {
              background: hoverGradient,
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          New Post
        </Button>
      )}
    </Box>
  )
}