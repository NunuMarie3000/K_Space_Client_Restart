import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardActions, Typography } from '@mui/material'
import EditModal from './edit/EditModal'
import DeleteBlog from './edit/DeleteBlog'

export default function BlogEntry({ title, date_of_entry, date_of_update, body, blogId, authorId, getBlogs, autoEdit}) {
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  useEffect(() => {
    // Auto-open edit modal if autoEdit prop is true
    if (autoEdit) {
      setEditMode(true)
    }
  }, [autoEdit])

  // Frutiger Aero glassmorphism styling
  const glassmorphismStyle = {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px) saturate(180%)',
    WebkitBackdropFilter: 'blur(10px) saturate(180%)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
    },
  }

  return (
    <Card sx={glassmorphismStyle}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h5" 
          component="h2"
          sx={{
            fontFamily: "'Michroma', sans-serif",
            fontWeight: 'bold',
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            fontFamily: "'Michroma', sans-serif",
            mb: 2,
            fontStyle: 'italic',
          }}
        >
          Posted: {date_of_entry}
          {date_of_update && (
            <>
              <br />
              Last Update: {date_of_update}
            </>
          )}
        </Typography>
        <Typography 
          variant="body1"
          sx={{
            fontFamily: "'Michroma', sans-serif",
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            mb: 2,
          }}
        >
          {body}
        </Typography>
      </CardContent>
      <CardActions sx={{ 
        px: { xs: 2, sm: 3 }, 
        pb: { xs: 2, sm: 3 },
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
      }}>
        <DeleteBlog blogId={blogId} authorId={authorId} getBlogs={getBlogs} />
        <EditModal 
          title={title} 
          body={body} 
          date_of_entry={date_of_entry} 
          blogId={blogId} 
          authorId={authorId} 
          editMode={editMode} 
          toggleEditMode={toggleEditMode} 
          getBlogs={getBlogs} 
        />
      </CardActions>
    </Card>
  )
}