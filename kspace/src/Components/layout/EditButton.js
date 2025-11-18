// body will be imported here, that way i'll be able to manipulate layout of other components when user clicks this button...
// when user clicks edit button, open modal
import React, { Component } from 'react'
import Body from '../body/Body'
import EditLayoutModal from './EditLayoutModal'
import { Box, Fab, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

export default class EditButton extends Component {
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
    const {
      isEditBtnClicked,
    } = this.state
    const { userLayout, userInfoAuth } = this.props
    return (
      <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        {/* Responsive Floating Action Button */}
        <Tooltip title="Edit Layout" placement="left" arrow>
          <Fab
            color="primary"
            aria-label="edit layout"
            onClick={this.handleClick}
            sx={{
              position: 'fixed',
              bottom: { xs: 16, sm: 24, md: 32 },
              right: { xs: 16, sm: 24, md: 32 },
              zIndex: 1000,
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <EditIcon />
          </Fab>
        </Tooltip>

        {/* Main Content */}
        <Box sx={{ width: '100%' }}>
          {userLayout !== undefined && userLayout !== null && userLayout !== '' && (
            <Body userInfoAuth={userInfoAuth} userLayout={userLayout} />
          )}
        </Box>

        {/* Edit Modal */}
        <EditLayoutModal 
          isEditBtnClicked={isEditBtnClicked} 
          handleClick={this.handleClick} 
        />
      </Box>
    )
  }
}