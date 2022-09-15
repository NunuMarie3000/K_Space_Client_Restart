import axios from 'axios'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
// here is where i make post request to server to create new blog entry
// perhaps another modal

export default function NewBlogEntry({ isAddBtnClicked, handleClick, author, getBlogs }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleClose = () => {
    handleClick()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = `${process.env.REACT_APP_SERVER}${author}/entry`
    // i need title, body, authorId

    const newPost = {
      title: title,
      body: body
    }
    try {
      await axios.post(url, newPost)
      getBlogs()
      handleClose()
      // call whatever function that gets all posts
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Modal show={isAddBtnClicked} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="post_title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" required placeholder='I made art today...' onChange={(e)=>setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="post_body">
              <Form.Label>Body</Form.Label>
              <Form.Control as="textarea" rows={3}  type="text" required placeholder='I crafted a beautiful painting!' onChange={(e)=>setBody(e.target.value)} />
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