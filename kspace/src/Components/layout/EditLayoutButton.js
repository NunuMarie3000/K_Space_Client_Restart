import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import EditLayoutModal from './EditLayoutModal'
import { getChipGradient, typography, getTextColor } from '../../styles'

export default function EditLayoutButton() {
  const userLayout = useSelector((state) => state.userData.userLayout)
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false)
  const chipGradient = getChipGradient(userLayout, 0.6)
  const hoverGradient = getChipGradient(userLayout, 0.8)

  const handleClick = () => {
    setIsEditBtnClicked(!isEditBtnClicked)
  }

  return (
    <>
      <Button
        onClick={handleClick}
        variant="contained"
        endIcon={<EditIcon />}
        sx={{
          ...typography,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          fontWeight: 600,
          background: chipGradient,
          border: '1px solid rgba(255, 255, 255, 0.5)',
          color: getTextColor(userLayout),
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          borderRadius: '12px',
          textTransform: 'none',
          px: { xs: 1.5, sm: 2 },
          py: { xs: 0.75, sm: 1 },
          '&:hover': {
            background: hoverGradient,
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        Edit Layout
      </Button>
      <EditLayoutModal 
        isEditBtnClicked={isEditBtnClicked} 
        handleClick={handleClick} 
      />
    </>
  )
}

