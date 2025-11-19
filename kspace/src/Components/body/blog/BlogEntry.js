import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardActions, Typography } from '@mui/material'
import EditModal from './edit/EditModal'
import DeleteBlog from './edit/DeleteBlog'
import { glassmorphismStyle, appColors, getBodyTextStyle } from '../../../styles'

export default function BlogEntry({ title, date_of_entry, date_of_update, body, blogId, authorId, getBlogs, autoEdit}) {
  const userLayout = useSelector((state) => state.userData.userLayout)
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

  // Blog entry card with hover effect
  const blogCardStyle = {
    ...glassmorphismStyle,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 12px 40px 0 ${appColors.shadowColorHover}`,
    },
  }

  return (
    <Card sx={blogCardStyle}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h5" 
          component="h2"
          sx={{
            ...getBodyTextStyle(userLayout, {
              fontWeight: 'bold',
              mb: 1,
            }),
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{
            ...getBodyTextStyle(userLayout, {
              mb: 2,
              fontStyle: 'italic',
              opacity: 0.8,
            }),
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
            ...getBodyTextStyle(userLayout, {
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              mb: 2,
            }),
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