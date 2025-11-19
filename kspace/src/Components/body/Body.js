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
import { Container, Box } from '@mui/material'

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
      console.error(error.message)
    }
  }

  getAboutMe = async () => {
    const userId = this.props.userLayout.user
    const url = `${process.env.REACT_APP_SERVER}aboutme/${userId}`
    try {
      await axios.get(url).then(res => this.setState({ aboutMe: res.data[0] }))
    } catch (error) {
      console.error(error.message)
    }
  }

  getLayout = async () => {
    // This method is available for future use if needed
    // Currently EditHero reloads the page, so this is a placeholder
    // If we want to refresh layout without reload, we'd need to update parent component
    return null
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
      console.error(error)
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
    
    // Frutiger Aero gradient background
    const frutigerAeroGradient = userLayout?.backImage 
      ? `linear-gradient(135deg, rgba(135, 206, 250, 0.3) 0%, rgba(144, 238, 144, 0.3) 50%, rgba(173, 216, 230, 0.3) 100%), url(${userLayout.backImage})`
      : userLayout?.backColor 
        ? `linear-gradient(135deg, rgba(135, 206, 250, 0.2) 0%, rgba(144, 238, 144, 0.2) 50%, rgba(173, 216, 230, 0.2) 100%), ${userLayout.backColor}`
        : 'linear-gradient(135deg, #87CEEB 0%, #90EE90 50%, #ADD8E6 100%)'

    if (this.state.isSiteLoading) {
      return <LoadingPage />
    }

    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: frutigerAeroGradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: userLayout ? userLayout.fontBodyColor : 'black',
          pt: { xs: 0, sm: 0, md: 0 },
          pb: { xs: 2, sm: 2, md: 1.5 },
          px: { xs: 0, sm: 0, md: 0 },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 1.5, md: 2 }, pt: { xs: 0.5, sm: 0.75, md: 1 } }}>
          {/* Original MySpace-inspired grid layout using CSS Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { 
                xs: '1fr', 
                sm: '1fr', 
                md: '0.5fr 1fr 1fr' 
              },
              gridTemplateRows: { 
                xs: 'auto', 
                sm: 'auto', 
                md: 'auto auto auto auto auto' 
              },
              gap: { xs: 1, sm: 1.5, md: 2 },
              rowGap: { xs: 1, sm: 1.5, md: 1.5 },
            }}
          >
            {/* Left Column - Profile (tall, top) - spans rows 1-2 */}
            {profile !== '' && (
              <Box
                sx={{
                  gridColumn: { xs: '1', md: '1' },
                  gridRow: { xs: 'auto', md: '1 / 3' },
                }}
              >
                <Profile 
                  getProfile={this.getProfile} 
                  userInfoAuth={userInfoAuth} 
                  id={userLayout.user} 
                  profile={profile} 
                />
              </Box>
            )}

            {/* Middle Column - Hero (tall, top) - spans rows 1-2 */}
            {userLayout && (
              <Box
                sx={{
                  gridColumn: { xs: '1', md: '2' },
                  gridRow: { xs: 'auto', md: '1 / 3' },
                }}
              >
                <Hero />
              </Box>
            )}

            {/* Right Column - About Me (tall, top) - spans rows 1-2 */}
            {aboutMe !== '' && (
              <Box
                sx={{
                  gridColumn: { xs: '1', md: '3' },
                  gridRow: { xs: 'auto', md: '1 / 3' },
                }}
              >
                <AboutMe 
                  aboutMe={aboutMe} 
                  getAboutMe={this.getAboutMe} 
                  id={userLayout.user} 
                />
              </Box>
            )}

            {/* Left Column - Contact (middle) - row 3 */}
            <Box
              sx={{
                gridColumn: { xs: '1', md: '1' },
                gridRow: { xs: 'auto', md: '3' },
              }}
            >
              <Contact />
            </Box>

            {/* Middle+Right Columns - Blog (wide, bottom) - spans columns 2-3, row 3 */}
            {blogs !== '' && blogs.length > 0 && (
              <Box
                sx={{
                  gridColumn: { xs: '1', md: '2 / 4' },
                  gridRow: { xs: 'auto', md: '3' },
                }}
              >
                <MainBlog blogs={blogs} id={_id} userLayout={userLayout} />
              </Box>
            )}

            {/* Left Column - Interests (bottom) - row 4 */}
            {userLayout && aboutMe?.interests && (
              <Box
                sx={{
                  gridColumn: { xs: '1', md: '1' },
                  gridRow: { xs: 'auto', md: '4' },
                }}
              >
                <InterestsC 
                  interests={aboutMe.interests} 
                  id={userLayout.user}
                  getAboutMe={this.getAboutMe}
                  aboutMe={aboutMe}
                />
              </Box>
            )}

            {/* Footer - Full width at bottom - spans all columns, row 5 */}
            <Box
              sx={{
                gridColumn: { xs: '1', md: '1 / 4' },
                gridRow: { xs: 'auto', md: '5' },
              }}
            >
              <Footer />
            </Box>
          </Box>
        </Container>
      </Box>
    )
  }
}