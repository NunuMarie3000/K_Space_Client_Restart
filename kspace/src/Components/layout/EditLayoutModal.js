import axios from 'axios'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function EditLayoutModal({ isEditBtnClicked, handleClick, userLayout, getLayout }) {
  const [backgroundColor, setBackgroundColor] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [bodyColor, setBodyColor] = useState('')
  const [hero1, setHeroImg1] = useState('')
  const [hero2, setHeroImg2] = useState('')
  const [hero1Alt, setAlt1] = useState('')
  const [hero2Alt, setAlt2] = useState('')

  const checkValues = (e) => {
    let sendBC
    let sendBI
    let sendBody
    let send1
    let send2
    let sendAlt1
    let sendAlt2
    if (backgroundColor === '') {
      sendBC = userLayout.backColor
    } else {
      sendBC = backgroundColor
    }
    if (backgroundImage === '') {
      sendBI = userLayout.backImage
    } else { sendBI = backgroundImage }
    if (bodyColor === '') {
      sendBody = userLayout.fontBodyColor
    } else { sendBody = bodyColor }
    if (hero1 === '') {
      send1 = userLayout.heroImg1
    } else { send1 = hero1 }
    if (hero2 === '') {
      send2 = userLayout.heroImg2
    } else { send2 = hero2 }
    if (hero1Alt === '') {
      sendAlt1 = userLayout.heroImg1Alt
    } else { sendAlt1 = hero1Alt }
    if (hero2Alt === '') {
      sendAlt2 = userLayout.heroImg2Alt
    } else { send2 = hero2Alt }

    return {
      backColor: sendBC, backImage: sendBI, fontBodyColor: sendBody,
      heroImg1: send1, heroImg2: send2, heroImg1Alt: sendAlt1, heroImg2Alt: sendAlt2
    }
  }

  // this needs to make put request to /layout/:user
  const handleSubmit = async (e) => {
    const userId = userLayout.user
    const url = `${process.env.REACT_APP_SERVER}layout/${userId}`
    try {
      e.preventDefault()
      // this will return an object
      const toSend = checkValues(e)
      await axios.put(url, toSend)
      getLayout()
      handleClick()
    } catch (error) {
      console.log(error.message)
    }
  }
  const { backColor, backImage, fontBodyColor, heroImg1, heroImg1Alt, heroImg2, heroImg2Alt } = userLayout
  return (
    <>
      <Modal show={isEditBtnClicked} onHide={handleClick}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Layout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="backgroundcolor">
              <Form.Label>Background Color</Form.Label>
              <Form.Control defaultValue={backColor} type="text" placeholder="Hex code: #fff" onChange={(e) => setBackgroundColor(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="backgroundimage">
              <Form.Label>Background Image</Form.Label>
              <Form.Control defaultValue={backImage} type="text" placeholder="Image url: http://www.asksfskd" onChange={(e) => setBackgroundImage(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="bodycolor">
              <Form.Label>Text Color: Body</Form.Label>
              <Form.Control defaultValue={fontBodyColor} type="text" placeholder="Hex code: #fff" onChange={(e) => setBodyColor(e.target.value)} />
            </Form.Group>

            {/*COME BACK TO THIS */}
            {/* <Form.Group className="mb-3" controlId="song-src">
              <Form.Label>Song Choice</Form.Label>
              <Form.Control type="file" placeholder="Image url: http://www.asksfskd" onChange={(e) => setBackgroundImage(e.target.value)} />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="hero1">
              <Form.Label>Hero image 1</Form.Label>
              <Form.Control defaultValue={heroImg1} type="text" placeholder="Image url: http://www.asksfskd" onChange={(e) => setHeroImg1(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="hero1alt">
              <Form.Label>Hero image 1 Alt</Form.Label>
              <Form.Control defaultValue={heroImg1Alt} type="text" placeholder="This is a picture of..." onChange={(e) => setAlt1(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="hero2">
              <Form.Label>Hero image 2</Form.Label>
              <Form.Control defaultValue={heroImg2} type="text" placeholder="Image url: http://www.asksfskd" onChange={(e) => setHeroImg2(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="hero2alt">
              <Form.Label>Hero image 2 Alt</Form.Label>
              <Form.Control defaultValue={heroImg2Alt} type="text" placeholder="This is a picture of..." onChange={(e) => setAlt2(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}