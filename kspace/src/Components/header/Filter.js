import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

export default class Filter extends Component {
  render() {
    return (
      <>
          <Form>
            <Form.Group style={{display:'flex', gap:'10px', alignItems:'center'}} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Search: </Form.Label>
              <Form.Control type="text" placeholder="nunumarie3000..." />
            </Form.Group>
          </Form>
      </>
    )
  }
}