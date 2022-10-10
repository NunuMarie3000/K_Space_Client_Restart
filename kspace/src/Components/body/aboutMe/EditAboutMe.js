import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios'

export default function EditAboutMe({ isEditBtnClicked, handleClick, aboutMe, id, getAboutMe }) {
  const [updatedAboutMe, setUpdate] = useState('')
  const [updatedInterests, setInterests] = useState('')
  const [updatedImage, setImage] = useState('')
  const [updatedAlt, setAlt] = useState('')

  const check = (e) => {
    let sendMe
    let sendInt
    let sendImg
    let sendAlt
    if(updatedAboutMe === ''){
      sendMe = aboutMe.about_me
    }else{sendMe = updatedAboutMe}
    if(updatedInterests === ''){
      sendInt = aboutMe.interests
    }else{
      sendInt = updatedInterests.split(',').filter(e => e.trim())
    }
    if(updatedImage === ''){
      sendImg = aboutMe.image
    }else{sendImg = updatedImage}
    if(updatedAlt === ''){
      sendAlt = aboutMe.alt
    }else{sendAlt = updatedAlt}
    console.log(sendAlt)
    return {about_me:sendMe, interests:sendInt, image:sendImg, alt:sendAlt}
  }

  const handleSubmit = async (e) => {
    const userId = id
    const url = `${process.env.REACT_APP_SERVER}aboutme/${userId}`
    const info = check(e)
    const newBody = { user:userId, ...info}
    console.log(newBody)
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

          <Form onSubmit={handleSubmit} netlify>

            <Form.Group className="mb-3" controlId="about-me">
              <Form.Label>About Me</Form.Label>
              <Form.Control type="text" defaultValue={aboutMe.about_me} onChange={(e) => setUpdate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="about-me">
              <Form.Label>About Me Image</Form.Label>
              <Form.Control type="text" defaultValue={aboutMe.image} onChange={(e) => setImage(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="about-me">
              <Form.Label>Image Alt</Form.Label>
              <Form.Control type="text" defaultValue={aboutMe.alt} onChange={(e) => setAlt(e.target.value)} />
              <Form.Text>What is this an image of?</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="interests">
              <Form.Label>Interests</Form.Label>
              <Form.Control type="text" defaultValue={aboutMe.interests} onChange={(e) => setInterests(e.target.value)} />
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