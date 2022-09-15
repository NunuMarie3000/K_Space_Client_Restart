import React, { Component } from 'react'

export default class InterestsC extends Component {
  render() {
    const { interests } = this.props
    return (
      <>
        <div className='interests-container' style={{border:'2px solid black', borderRadius: '4%/5%'}}>
          <h1 style={{fontSize:'24px', fontFamily:"'Michroma', sans-serif"}}>Interests</h1>
          <ul>
            {interests && interests.map(int=><li>{int}</li>)}
          </ul>
        </div>
      </>
    )
  }
}
