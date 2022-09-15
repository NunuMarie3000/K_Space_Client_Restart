// this will have about info, i need some default text here, the user wont have it until they create an account and edit this for the first time
import React, { Component } from 'react'
import EditAboutMe from './EditAboutMe'

export default class AboutMe extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isEditBtnClicked: false,
    }
  }
  
  handleClick = () => {
    this.setState({isEditBtnClicked: !this.state.isEditBtnClicked})
  }
  render() {
    const { aboutMe, id, getAboutMe } = this.props
    const { isEditBtnClicked } = this.state

    return (
      <>
        <div className='about-me-container' style={{ border: '2px solid black', borderRadius: '3%/5%' }}>
          <h5 style={{fontFamily:"'Michroma', sans-serif"}}>About Me</h5>
          <p>{aboutMe.about_me}</p>
          {aboutMe.image && <img style={{width:'100%'}} alt={aboutMe.alt} src={aboutMe.image}></img>}
          <div className='edit-me-brackets' onClick={this.handleClick}>[Edit Me]
          </div>
        </div>

        <EditAboutMe getAboutMe={getAboutMe} id={id} aboutMe={aboutMe} handleClick={this.handleClick} isEditBtnClicked={isEditBtnClicked} />
      </>
    )
  }
}