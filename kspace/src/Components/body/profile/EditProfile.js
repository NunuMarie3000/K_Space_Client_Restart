import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios'

export default function EditProfile({ isEditBtnClicked, handleClick, profile, mood, id, getProfile, profilePic, username, authProfilePic, authUsername }) {
  const [updatedProfile, setUpdate] = useState('')
  const [updatedMood, setMood] = useState('')
  const [updatedProfilePic, setProfilePic] = useState('')
  const [updatedUsername, setUsername] = useState('')

  const handleSubmit = async (e) => {
    const userId = id
    const url = `${process.env.REACT_APP_SERVER}profile/${userId}`
    let sendMood
    let sendProfile
    let sendPic
    let sendUsername

    if (updatedProfile === '') { sendProfile = profile } else { sendProfile = updatedProfile }
    if (updatedMood === '') { sendMood = mood } else { sendMood = updatedMood }
    if (updatedProfilePic === '') { sendPic = profilePic } else { sendPic = updatedProfilePic }
    if (updatedUsername === '') { sendUsername = username } else { sendUsername = updatedUsername }

    const newBody = {
      user: userId,
      profile: sendProfile,
      mood: sendMood,
      profilePic: sendPic,
      username: sendUsername
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

          <Form onSubmit={handleSubmit} >

            <Form.Group className="mb-3" controlId="profile">
              <Form.Label>Profile</Form.Label>
              <Form.Control as="textarea" rows={3}  type="text" defaultValue={profile} onChange={(e) => setUpdate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profile">
              <Form.Label>Profile Pic</Form.Label>
              <Form.Control  type="text" defaultValue={profilePic ? profilePic : authProfilePic} onChange={(e) => setProfilePic(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profile">
              <Form.Label>Username</Form.Label>
              <Form.Control  type="text" defaultValue={username ? username : authUsername} onChange={(e) => setUsername(e.target.value)} />
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