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
// import Navigation from './Navigation'
import Contact from './Contact'
import InterestsC from './InterestsC'
import Hero from './Hero'
import AboutMe from './aboutMe/AboutMe'
import MainBlog from './blog/MainBlog'
import LoadingPage from '../LoadingPage'
import Footer from './Footer'

export default class Body extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: '',
      profile: '',
      aboutMe: '',
      blogs: '',
      isSiteLoading: ''
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

  getAllRequestInfo = async () => {
    let urlArr = []
    const userId = this.props.userLayout.user
    const userInfoUrl = `${process.env.REACT_APP_SERVER}user/${userId}`
    const profileUrl = `${process.env.REACT_APP_SERVER}profile/${userId}`
    const aboutMeUrl = `${process.env.REACT_APP_SERVER}aboutme/${userId}`
    const blogsUrl = `${process.env.REACT_APP_SERVER}${userId}/entries`
    urlArr.push(userInfoUrl, profileUrl, aboutMeUrl, blogsUrl)

    try {
      await axios.all(urlArr.map((url) => axios.get(url))).then(axios.spread(
        (userData, profile, aboutMe, blogs) => {
          this.setState({ userData: userData.data[0] })
          this.setState({ profile: profile.data[0] })
          this.setState({ aboutMe: aboutMe.data[0] })
          this.setState({ blogs: blogs.data })
        }
      ))
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount = () => {
    this.setState({ isSiteLoading: true })
    this.props.userLayout && this.getAllRequestInfo()
    this.setState({ isSiteLoading: false })
  }

  render() {
    const { _id } = this.state.userData
    const { userLayout, userInfoAuth } = this.props
    const { profile, aboutMe, blogs } = this.state
    return (
      <>
        {this.state.isSiteLoading ? <LoadingPage /> : <div className='body-container'
          style={{
            // backgroundColor: userLayout ? userLayout.backColor : '#fff',
            // backgroundImage: userLayout ? `url(${userLayout.backImage})` : 'none',
            color: userLayout ? userLayout.fontBodyColor : 'black', 
          }}>
          {profile !== '' && <Profile getProfile={this.getProfile} userInfoAuth={userInfoAuth} id={userLayout.user} profile={profile} />}
          <Contact />
          {userLayout && <InterestsC interests={aboutMe.interests} />}
          {userLayout && <Hero userLayout={userLayout} />}
          {aboutMe !== '' && <AboutMe aboutMe={aboutMe} getAboutMe={this.getAboutMe} id={userLayout.user} />}
          {blogs !== '' && <MainBlog blogs={blogs} id={_id} />}
          <Footer/>
        </div>}
      </>
    )
  }
}