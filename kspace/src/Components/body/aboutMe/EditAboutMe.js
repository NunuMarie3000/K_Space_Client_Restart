import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios'

export default function EditAboutMe({ isEditBtnClicked, handleClick, aboutMe, id, getAboutMe, interests }) {
  const [updatedAboutMe, setUpdate] = useState('')
  const [updatedInterests, setInterests] = useState('')

  const check = (e) => {
    let sendMe
    let sendInt
    if(updatedAboutMe === ''){
      sendMe = aboutMe
    }else{sendMe = updatedAboutMe}
    if(updatedInterests === ''){
      sendInt = interests
    }else{
      sendInt = updatedInterests.split(',').filter(e => e.trim())
    }

    return {about_me:sendMe, interests:sendInt}
  }

  const handleSubmit = async (e) => {
    const userId = id
    const url = `${process.env.REACT_APP_SERVER}aboutme/${userId}`
    const info = check(e)
    const newBody = {...info, user:userId}
    try {
      e.preventDefault()
      await axios.put(url, newBody)
      getAboutMe()
      handleClick()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Modal show={isEditBtnClicked} onHide={handleClick}>
        <Modal.Header closeButton>
          <Modal.Title>Edit About Me</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="about-me">
              <Form.Label>About Me</Form.Label>
              <Form.Control type="text" defaultValue={aboutMe} onChange={(e) => setUpdate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="interests">
              <Form.Label>Interests</Form.Label>
              <Form.Control type="text" defaultValue={interests} onChange={(e) => setInterests(e.target.value)} />
              <Form.Text>Separate with commas</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}