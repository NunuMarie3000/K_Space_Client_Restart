import React, { useState } from 'react'
import { Button, Box } from '@mui/material'
import NewBlogEntry from './NewBlogEntry'

export default function AddBlogEntry( { author, getBlogs }) {
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false)

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
            fontFamily: "'Michroma', sans-serif",
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 600,
            background: 'linear-gradient(135deg, rgba(135, 206, 250, 0.6) 0%, rgba(144, 238, 144, 0.6) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            color: 'text.primary',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '12px',
            textTransform: 'none',
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.25 },
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(135, 206, 250, 0.8) 0%, rgba(144, 238, 144, 0.8) 100%)',
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