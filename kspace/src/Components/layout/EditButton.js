// body will be imported here, that way i'll be able to manipulate layout of other components when user clicks this button...
// when user clicks edit button, open modal
import React, { Component } from 'react'
import Body from '../body/Body'
import { Box } from '@mui/material'

export default class EditButton extends Component {
  render() {
    const { userLayout, userInfoAuth } = this.props
    return (
      <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        {/* Main Content */}
        <Box sx={{ width: '100%' }}>
          {userLayout !== undefined && userLayout !== null && userLayout !== '' && (
            <Body userInfoAuth={userInfoAuth} userLayout={userLayout} />
          )}
        </Box>
      </Box>
    )
  }
}