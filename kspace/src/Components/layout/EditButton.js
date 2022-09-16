// body will be imported here, that way i'll be able to manipulate layout of other components when user clicks this button...
// when user clicks edit button, open modal
import React, { Component } from 'react'
import Body from '../body/Body'
import EditLayoutModal from './EditLayoutModal'

export default class EditButton extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isEditBtnClicked:false,
    }
  }

  handleClick = () => {
    this.setState({isEditBtnClicked: !this.state.isEditBtnClicked})
  }

  render() {
    const {
      isEditBtnClicked,
    } = this.state
    const { userLayout, getLayout, logout, userInfoAuth } = this.props
    return (
      <>
        <div className='edit-layout-container'>

          <button style={{float:'right', marginLeft:'-1000px', marginBottom:'-80px'}} onClick={this.handleClick} className='Edit-button'>Edit <i className="fa-solid fa-pen-to-square"></i></button>

          {userLayout && <Body userInfoAuth={userInfoAuth} logout={logout} userLayout={userLayout} />}

        </div>
        <EditLayoutModal userLayout={userLayout} isEditBtnClicked={isEditBtnClicked} handleClick={this.handleClick} getLayout={getLayout} />
      </>
    )
  }
}