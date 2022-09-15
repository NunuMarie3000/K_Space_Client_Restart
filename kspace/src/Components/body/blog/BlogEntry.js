import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import EditModal from './edit/EditModal'
import DeleteBlog from './edit/DeleteBlog'

export default function BlogEntry({ title, date_of_entry, date_of_update, body, blogId, authorId, getBlogs}) {
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  return (
    <>
      <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Posted: {date_of_entry}<br />
          {date_of_update && `Last Update: ${date_of_update}`}
        </Card.Subtitle>
        <Card.Text>{body}
        </Card.Text>
        <Card.Footer style={{ backgroundColor: '#fff', borderStyle: 'none', display: 'flex', gap: '2rem' }}>
        
          <DeleteBlog blogId={blogId} authorId={authorId} getBlogs={getBlogs} />
          
          <EditModal title={title} body={body} date_of_entry={date_of_entry} blogId={blogId} authorId={authorId} editMode={editMode} toggleEditMode={toggleEditMode} getBlogs={getBlogs} />

        </Card.Footer>
      </Card.Body>
    </Card>

    </>
  )
}