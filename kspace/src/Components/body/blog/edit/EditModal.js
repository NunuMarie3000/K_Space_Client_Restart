import axios from 'axios'
import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default function EditModal({ editMode, toggleEditMode, blogId, authorId, title, body, date_of_entry, getBlogs }) {

  const [updatedTitle, setTitle] = useState('')
  const [updatedBody, setBody] = useState('')

  const handleClose = () => {
    toggleEditMode()
  }

  const checkFirst = () => {
    let titleUpdate
    let bodyUpdate
    // checking first, if the title or body isn't changed, i need to send back og value
    if(updatedTitle !==''){
      titleUpdate = updatedTitle
    }else{titleUpdate = title}
    if(updatedBody !== ''){
      bodyUpdate = updatedBody
    }else{bodyUpdate = body}
    
    // need title, body, and date_of_entry
    const updatedBlogEntry = {
      title: titleUpdate,
      body: bodyUpdate,
      date_of_entry: date_of_entry
    }
    return updatedBlogEntry
  }

  const handleSubmit = async (e) => {
    // when an update is made, i need to make put request to server, server/:user/entries/:id
    // const userId=authorId
    const blog=blogId
    const url=`${process.env.REACT_APP_SERVER}entry/${blog}`
    
    try {
      e.preventDefault()
      const body = checkFirst()
      await axios.put(url, body)
      handleClose()
      // i'll also need to make whatever call i need to get all of the blogs back from server
      getBlogs()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <i onClick={toggleEditMode} className="fa-solid fa-pencil"></i>

      <Modal show={editMode} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit} netlify>

            <Form.Group className="mb-3" controlId="post_title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" defaultValue={title} onChange={(e)=>setTitle(e.target.value)}  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="post_body">
              <Form.Label>Body</Form.Label>
              <Form.Control as="textarea" rows={3}  type="text" defaultValue={body} onChange={(e)=>setBody(e.target.value)}  />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}