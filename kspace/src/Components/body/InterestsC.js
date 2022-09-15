import React, { Component } from 'react'

export default class InterestsC extends Component {
  render() {
    const { interests } = this.props
    return (
      <>
        <div className='interests-container' style={{border:'2px solid black'}}>
          <h5>Interests</h5>
          <ul>
            {interests && interests.map(int=><li>{int}</li>)}
          </ul>
        </div>
      </>
    )
  }
}
