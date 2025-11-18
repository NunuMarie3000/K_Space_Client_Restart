import axios from 'axios'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserLayout } from '../../store/userDataSlice'

export default function EditLayoutModal({ isEditBtnClicked, handleClick }) {
  const dispatch = useDispatch()
  const userLayout = useSelector((state) => state.userData.userLayout)
  const [backgroundColor, setBackgroundColor] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [bodyColor, setBodyColor] = useState('')

  if (!userLayout) return null

  const checkValues = (e) => {
    let sendBC
    let sendBI
    let sendBody
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

    return {
      backColor: sendBC, 
      backImage: sendBI, 
      fontBodyColor: sendBody,
      heroImg1: userLayout.heroImg1, 
      heroImg2: userLayout.heroImg2, 
      heroImg1Alt: userLayout.heroImg1Alt, 
      heroImg2Alt: userLayout.heroImg2Alt
    }
  }

  // this needs to make put request to /layout/:user
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userLayout) return
    
    const userId = userLayout.user
    const url = `${process.env.REACT_APP_SERVER}layout/${userId}`
    try {
      // this will return an object
      const toSend = checkValues(e)
      console.log(toSend)
      await axios.put(url, toSend)
      
      // Update Redux state instead of reloading
      const updatedLayout = {
        backColor: toSend.backColor,
        backImage: toSend.backImage,
        fontBodyColor: toSend.fontBodyColor,
      }
      dispatch(updateUserLayout(updatedLayout))
      handleClick()
    } catch (error) {
      console.log(error.message)
    }
  }
  const { backColor, backImage, fontBodyColor } = userLayout
  return (
    <>
      <Modal show={isEditBtnClicked} onHide={handleClick}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Layout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} >
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