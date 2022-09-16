import React, { Component } from 'react'
import Filter from './Filter'
import Logout from '../auth/Logout'

export default class Header extends Component {
  render() {
    return (
      <>
        <div className='header-container'>
        <h2 style={{fontFamily:"'Michroma', sans-serif"}}><i className="fa-solid fa-users"></i> k_space</h2>
        <Filter/>
        <Logout logout={this.props.logout} />
        </div>
      </>
    )
  }
}