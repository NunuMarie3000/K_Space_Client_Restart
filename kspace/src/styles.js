// App Colors - Frutiger Aero Theme
export const appColors = {
  // Primary gradient colors
  skyBlue: '#87CEEB',
  lightGreen: '#90EE90',
  lightBlue: '#ADD8E6',
  
  // Glassmorphism colors
  glassWhite: 'rgba(255, 255, 255, 0.25)',
  glassBorder: 'rgba(255, 255, 255, 0.3)',
  glassBorderHover: 'rgba(255, 255, 255, 0.7)',
  glassBorderFocus: 'rgba(255, 255, 255, 0.9)',
  glassInputBg: 'rgba(255, 255, 255, 0.3)',
  glassButtonBg: 'rgba(255, 255, 255, 0.4)',
  glassButtonBgHover: 'rgba(255, 255, 255, 0.6)',
  
  // Text colors
  textPrimary: 'rgba(0, 0, 0, 0.7)',
  textSecondary: 'rgba(0, 0, 0, 0.8)',
  textBlack: 'black',
  
  // Shadow colors
  shadowColor: 'rgba(31, 38, 135, 0.37)',
  shadowColorHover: 'rgba(31, 38, 135, 0.5)',
  textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)',
}

// Frutiger Aero gradient background
export const frutigerAeroGradient = 'linear-gradient(135deg, #87CEEB 0%, #90EE90 50%, #ADD8E6 100%)'

// Glassmorphism card style
export const glassmorphismStyle = {
  background: appColors.glassWhite,
  backdropFilter: 'blur(10px) saturate(180%)',
  WebkitBackdropFilter: 'blur(10px) saturate(180%)',
  border: `2px solid ${appColors.glassBorder}`,
  borderRadius: '20px',
  boxShadow: `0 8px 32px 0 ${appColors.shadowColor}`,
}

// Glassmorphism style with top gradient overlay (for Header, AboutMe)
export const glassmorphismWithOverlay = {
  ...glassmorphismStyle,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)',
    pointerEvents: 'none',
  }
}

// Common page container (full viewport background)
export const pageContainer = {
  minHeight: '100vh',
  background: frutigerAeroGradient,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pt: { xs: 2, sm: 3, md: 4 },
  pb: { xs: 2, sm: 3, md: 4 },
  px: { xs: 1, sm: 2, md: 3 },
}

// Typography styles
export const typography = {
  fontFamily: "'Michroma', sans-serif",
}

export const heading1 = {
  ...typography,
  fontWeight: 'bold',
  mb: 2,
  textAlign: 'center',
  textShadow: appColors.textShadow,
}

export const heading2 = {
  ...typography,
  mb: 3,
  textAlign: 'center',
}

export const bodyText = {
  ...typography,
}

// Modal/Dialog styles
export const modalPaperStyle = {
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(10px) saturate(180%)',
  WebkitBackdropFilter: 'blur(10px) saturate(180%)',
  border: '2px solid rgba(255, 255, 255, 0.4)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}

export const modalTitleStyle = {
  ...typography,
  fontWeight: 'bold',
}

export const modalTextFieldStyle = {
  '& .MuiOutlinedInput-root': {
    ...typography,
    background: appColors.glassInputBg,
    backdropFilter: 'blur(5px)',
    '& fieldset': {
      border: '1px solid rgba(255, 255, 255, 0.4)',
    },
    '&:hover fieldset': {
      border: '1px solid rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid rgba(255, 255, 255, 0.7)',
    },
  },
  '& .MuiInputLabel-root': {
    ...typography,
  },
}

export const modalButtonStyle = {
  ...typography,
  color: 'text.primary',
}

// Helper function to get modal primary button style with custom gradient
export const getModalPrimaryButtonStyle = (userLayout) => {
  const chipGradient = getChipGradient(userLayout, 0.6)
  const hoverGradient = getChipGradient(userLayout, 0.8)
  
  return {
    ...typography,
    background: chipGradient,
    border: '1px solid rgba(255, 255, 255, 0.5)',
    color: getTextColor(userLayout),
    '&:hover': {
      background: hoverGradient,
    },
  }
}

// Legacy export for backward compatibility (uses default gradient)
export const modalPrimaryButtonStyle = {
  ...typography,
  background: 'linear-gradient(135deg, rgba(135, 206, 250, 0.6) 0%, rgba(144, 238, 144, 0.6) 100%)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  color: 'text.primary',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(135, 206, 250, 0.8) 0%, rgba(144, 238, 144, 0.8) 100%)',
  },
}

// TextField styles
export const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    fontFamily: typography.fontFamily,
    backgroundColor: appColors.glassInputBg,
    '& fieldset': {
      borderColor: appColors.glassBorder,
    },
    '&:hover fieldset': {
      borderColor: appColors.glassBorderHover,
    },
    '&.Mui-focused fieldset': {
      borderColor: appColors.glassBorderFocus,
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: typography.fontFamily,
    color: appColors.textPrimary,
  },
}

// Button styles
export const primaryButton = {
  fontFamily: typography.fontFamily,
  backgroundColor: appColors.glassButtonBg,
  color: appColors.textBlack,
  fontWeight: 'bold',
  py: 1.5,
  '&:hover': {
    backgroundColor: appColors.glassButtonBgHover,
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${appColors.shadowColorHover}`,
  },
  transition: 'all 0.3s ease',
}

// Link button style (for "Register here", "Login here", etc.)
export const linkButton = {
  fontFamily: typography.fontFamily,
  color: 'inherit',
  textDecoration: 'underline',
  textTransform: 'none',
  minWidth: 'auto',
  p: 0,
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
  },
}

// Alert styles
export const alertStyle = {
  fontFamily: typography.fontFamily,
}

// Card content padding
export const cardContentPadding = {
  p: { xs: 3, sm: 4, md: 5 }
}

// Form container
export const formContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}

// Navigation link container
export const navLinkContainer = {
  mt: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
  textAlign: 'center',
}

// Helper function to convert hex to RGB
const hexToRgb = (hex) => {
  if (!hex) return null
  
  // Remove # if present
  let cleanHex = hex.trim().replace('#', '')
  
  // Handle 3-character hex codes (e.g., #fff -> #ffffff)
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('')
  }
  
  // Validate and parse 6-character hex
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// Helper function to create gradient from a single color
const createGradientFromColor = (color) => {
  const rgb = hexToRgb(color)
  if (!rgb) return frutigerAeroGradient // Fallback if color is invalid
  
  // Helper function for color manipulation
  const lighten = (r, g, b, factor = 0.3) => {
    return `rgb(${Math.min(255, Math.round(r + (255 - r) * factor))}, ${Math.min(255, Math.round(g + (255 - g) * factor))}, ${Math.min(255, Math.round(b + (255 - b) * factor))})`
  }
  
  // Create a more dynamic gradient similar to frutigerAeroGradient style
  // Three distinct colors: light variation, original, and complementary variation
  const startColor = lighten(rgb.r, rgb.g, rgb.b, 0.5) // Lightest - similar to sky blue in frutiger
  const midColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` // Original color - similar to light green
  // For end color, create a complementary variation by slightly shifting hue
  // Add a bit of blue tint to create a cooler variation (like light blue in frutiger)
  const endR = Math.min(255, Math.round(rgb.r * 0.7 + 173 * 0.3))
  const endG = Math.min(255, Math.round(rgb.g * 0.7 + 216 * 0.3))
  const endB = Math.min(255, Math.round(rgb.b * 0.7 + 230 * 0.3))
  const endColor = `rgb(${endR}, ${endG}, ${endB})`
  
  return `linear-gradient(135deg, ${startColor} 0%, ${midColor} 50%, ${endColor} 100%)`
}

// Helper function to get gradient for chips/buttons (semi-transparent version)
export const getChipGradient = (userLayout, opacity = 0.6) => {
  // If user has a background color, create a gradient from it
  if (userLayout?.backColor && userLayout.backColor.trim() !== '') {
    const rgb = hexToRgb(userLayout.backColor.trim())
    if (rgb) {
      // Create lighter variations for chip/button gradient
      const lighten = (r, g, b, factor = 0.3) => {
        return `rgba(${Math.min(255, Math.round(r + (255 - r) * factor))}, ${Math.min(255, Math.round(g + (255 - g) * factor))}, ${Math.min(255, Math.round(b + (255 - b) * factor))}, ${opacity})`
      }
      
      const startColor = lighten(rgb.r, rgb.g, rgb.b, 0.5)
      const midColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
      
      return `linear-gradient(135deg, ${startColor} 0%, ${midColor} 100%)`
    }
  }
  // Default frutiger aero gradient for chips/buttons
  return `linear-gradient(135deg, rgba(135, 206, 250, ${opacity}) 0%, rgba(144, 238, 144, ${opacity}) 100%)`
}

// Helper function to get gradient with user layout customization
export const getCustomGradient = (userLayout) => {
  // Priority: background image > background color > default gradient
  // Check for null, undefined, or empty string (after trim)
  const backImage = userLayout?.backImage
  const hasImage = backImage && 
                   backImage !== null && 
                   backImage !== undefined &&
                   typeof backImage === 'string' &&
                   backImage.trim() !== ''
  
  if (hasImage) {
    // If there's a background image, overlay a subtle gradient on top
    // Ensure URL is properly formatted
    const imageUrl = userLayout.backImage.trim()
    const urlFormatted = imageUrl.startsWith('url(') ? imageUrl : `url("${imageUrl}")`
    
    if (userLayout?.backColor && userLayout.backColor.trim() !== '') {
      // Create a semi-transparent gradient overlay from user's color
      const rgb = hexToRgb(userLayout.backColor.trim())
      if (rgb) {
        const overlay = `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2) 50%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3) 100%)`
        return `${overlay}, ${urlFormatted}`
      }
    }
    // Default overlay if no color specified
    return `linear-gradient(135deg, rgba(135, 206, 250, 0.3) 0%, rgba(144, 238, 144, 0.3) 50%, rgba(173, 216, 230, 0.3) 100%), ${urlFormatted}`
  }
  if (userLayout?.backColor && userLayout.backColor.trim() !== '') {
    // Create a gradient from the user's color
    return createGradientFromColor(userLayout.backColor.trim())
  }
  return frutigerAeroGradient
}

// Helper function to get text color from userLayout
export const getTextColor = (userLayout, fallback = 'black') => {
  return userLayout?.fontBodyColor || fallback
}

// Helper function to get typography style with custom text color
export const getTypographyStyle = (userLayout, baseStyle = {}) => {
  return {
    ...typography,
    ...baseStyle,
    color: getTextColor(userLayout, baseStyle.color),
  }
}

// Helper function to get heading style with custom text color
export const getHeadingStyle = (userLayout, variant = 'h1') => {
  const baseStyle = variant === 'h1' ? heading1 : heading2
  return {
    ...baseStyle,
    color: getTextColor(userLayout, 'black'),
  }
}

// Helper function to get body text style with custom text color
export const getBodyTextStyle = (userLayout, baseStyle = {}) => {
  return {
    ...bodyText,
    ...baseStyle,
    color: getTextColor(userLayout, baseStyle.color || 'black'),
  }
}

