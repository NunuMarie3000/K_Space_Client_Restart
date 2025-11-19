// this will have about info, i need some default text here, the user wont have it until they create an account and edit this for the first time
import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditAboutMe from './EditAboutMe'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { glassmorphismWithOverlay, getBodyTextStyle } from '../../../styles'

class AboutMe extends Component {
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
    const { aboutMe, id, getAboutMe, userLayout } = this.props
    const { isEditBtnClicked } = this.state

    return (
      <>
        <Card sx={glassmorphismWithOverlay}>
          <CardContent sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h5" 
              component="h5" 
              sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                ...getBodyTextStyle(userLayout, {
                  mb: 2,
                  fontWeight: 'bold',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }),
              }}
            >
              About Me
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                ...getBodyTextStyle(userLayout, {
                  mb: 2,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: 1.8
                }),
              }}
            >
              {aboutMe.about_me}
            </Typography>
            {aboutMe.image && (
              <Box
                component="img"
                alt={aboutMe.alt || 'About me image'}
                src={aboutMe.image}
                sx={{
                  width: '100%',
                  borderRadius: '15px',
                  border: '3px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  mb: 2,
                  display: 'block'
                }}
              />
            )}
            <Box 
              className='edit-me-brackets' 
              onClick={this.handleClick}
              sx={{
                cursor: 'pointer',
                color: 'primary.main',
                fontWeight: 'bold',
                textDecoration: 'underline',
                '&:hover': {
                  opacity: 0.8,
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
                display: 'inline-block',
                mt: 1
              }}
            >
              [Edit Me]
            </Box>
          </CardContent>
        </Card>

        <EditAboutMe 
          getAboutMe={getAboutMe} 
          id={id} 
          aboutMe={aboutMe} 
          handleClick={this.handleClick} 
          isEditBtnClicked={isEditBtnClicked} 
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  userLayout: state.userData.userLayout
})

export default connect(mapStateToProps)(AboutMe)