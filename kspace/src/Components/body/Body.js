// this is Body component
// will hold everything in the body of the page, i'll be able to get info from here that i can pass down to everything else
// profile component-
// contact component-
// interests component-
// hero pic-
// about me component-
// main blog component-
// navbar component-
// login components
// this component needs to make a get request at with useEffect, or maybe i'll use class component for this...componentDidMount
import React, { Component } from 'react'
import axios from 'axios'
import Profile from './profile/Profile'
import Navigation from './Navigation'
import Contact from './Contact'
import InterestsC from './InterestsC'
import Hero from './Hero'
import AboutMe from './aboutMe/AboutMe'
import MainBlog from './blog/MainBlog'

export default class Body extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: '',
      profile: '',
      aboutMe: '',
      blogs: ''
    }
  }

  getUserInfo = async () => {
    const userId = this.props.userLayout.user
    const url = `${process.env.REACT_APP_SERVER}user/${userId}`
    // const url =  `http://localhost:3002/${userId}`
    // i'll wanna make request to server/:id, i'll get id from auth0 when i implement it, until then use mine
    try {
      const response = await axios.get(url)
      this.setState({ userData: response.data })
    } catch (error) {
      console.log(error.message)
    }
  }

  getProfile = async () => {
    const userId = this.props.userLayout.user
    const url = `${process.env.REACT_APP_SERVER}profile/${userId}`
    try {
      await axios.get(url).then(res => this.setState({ profile: res.data[0] }))
    } catch (error) {
      console.log(error.message)
    }
  }

  getAboutMe = async () => {
    const userId = this.props.userLayout.user
    const url = `${process.env.REACT_APP_SERVER}aboutme/${userId}`
    try {
      await axios.get(url).then(res => this.setState({ aboutMe: res.data[0] }))
    } catch (error) {
      console.log(error.message)
    }
  }

  getBlogs = async () => {
    const userId = this.props.userLayout.user
    const url = `${process.env.REACT_APP_SERVER}${userId}/entries`
    try {
      await axios.get(url).then(res => this.setState({blogs: res.data}))
    } catch (error) {
      console.log(error.message)
    }
  }

  componentDidMount = () => {
    this.getUserInfo()
    this.getProfile()
    this.getAboutMe()
    this.getBlogs()
  }

  render() {
    const { _id, username } = this.state.userData
    const { userLayout } = this.props
    const { profile, aboutMe, blogs } = this.state
    return (
      <>
        <div className='body-container'
          style={{
            backgroundColor: userLayout ? userLayout.backColor : '#fff',
            backgroundImage: userLayout ? `url(${userLayout.backImage})` : 'none',
            color: userLayout ? userLayout.fontBodyColor : 'black',
          }}>
          <Navigation username={username} />
          {/*i'll pass bio/profilepic/mood later */}
          {/* {profile !== '' &&
            <Profile key={_id}
              id={_id}
              username={username}
              profilePic={ProfilePic}
              profile={profile} />} */}
          {profile !== '' && <Profile id={_id} profile={profile} />}
          <Contact />
          {userLayout && <InterestsC interests={aboutMe.interests} />}
          {userLayout && <Hero userLayout={userLayout} />}
          {aboutMe !== '' && <AboutMe aboutMe={aboutMe} getAboutMe={this.getAboutMe} id={_id} />}
          {blogs !== '' && <MainBlog blogs={blogs} id={_id} />}
        </div>
      </>
    )
  }
}