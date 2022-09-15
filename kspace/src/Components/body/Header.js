import React, { Component } from 'react'
import Filter from './Filter'
import Logout from './Logout'

export default class Header extends Component {
  render() {
    return (
      <>
        <div className='header-container'>
        <h2 style={{fontFamily:"'Michroma', sans-serif"}}><i class="fa-solid fa-users"></i> K_Space</h2>
        <Filter/>
        <Logout/>
        </div>
      </>
    )
  }
}