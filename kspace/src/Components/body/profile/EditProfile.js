import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios'

export default function EditProfile({ isEditBtnClicked, handleClick, profile, mood, id, getProfile }) {
  const [updatedProfile, setUpdate] = useState('')
  const [updatedMood, setMood] = useState('')

  const handleSubmit = async (e) => {
    const userId = id
    const url = `${process.env.REACT_APP_SERVER}profile/${userId}`
    let sendMood
    let sendProfile

    if (updatedProfile === '') { sendProfile = profile } else { sendProfile = updatedProfile }
    if (updatedMood === '') { sendMood = mood } else { sendMood = updatedMood }

    const newBody = {
      user: userId,
      profile: sendProfile,
      mood: sendMood
    }
    try {
      e.preventDefault()
      await axios.put(url, newBody)
      getProfile()
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

            <Form.Group className="mb-3" controlId="profile">
              <Form.Label>Profile</Form.Label>
              <Form.Control type="text" defaultValue={profile} onChange={(e) => setUpdate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mood">
              <Form.Label>Mood</Form.Label>
              <Form.Control type="text" defaultValue={mood} onChange={(e) => setMood(e.target.value)} />
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