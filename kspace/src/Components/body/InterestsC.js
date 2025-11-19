import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardContent, Typography, Chip, Stack, Box } from '@mui/material'
import EditInterests from './EditInterests'
import { glassmorphismWithOverlay, getBodyTextStyle, getChipGradient } from '../../styles'

class InterestsC extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditBtnClicked: false,
    }
  }

  handleClick = () => {
    this.setState({ isEditBtnClicked: !this.state.isEditBtnClicked })
  }

  render() {
    const { interests, id, getAboutMe, aboutMe, userLayout } = this.props
    const { isEditBtnClicked } = this.state

    return (
      <>
      <Card sx={glassmorphismWithOverlay}>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              ...getBodyTextStyle(userLayout, {
                mb: 2,
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }),
            }}
          >
            Interests
          </Typography>
          {interests && interests.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {interests.map((int, index) => {
                const chipGradient = getChipGradient(userLayout, 0.6)
                const hoverGradient = getChipGradient(userLayout, 0.8)
                return (
                  <Chip
                    key={index}
                    label={int}
                    sx={{
                      background: chipGradient,
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      color: userLayout?.fontBodyColor || 'text.primary',
                      fontWeight: 500,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      '&:hover': {
                        background: hoverGradient,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  />
                )
              })}
            </Stack>
          ) : (
            <Typography 
              variant="body2" 
              sx={{
                ...getBodyTextStyle(userLayout, {
                  fontStyle: 'italic',
                  opacity: 0.8,
                }),
              }}
            >
              No interests listed yet
            </Typography>
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
              mt: 2
            }}
          >
            [Edit Me]
          </Box>
        </CardContent>
      </Card>
      <EditInterests 
        isEditBtnClicked={isEditBtnClicked}
        handleClick={this.handleClick}
        interests={interests}
        id={id}
        getAboutMe={getAboutMe}
        aboutMe={aboutMe}
      />
    </>
    )
  }
}

const mapStateToProps = (state) => ({
  userLayout: state.userData.userLayout
})

export default connect(mapStateToProps)(InterestsC)
