import React from 'react'

// user will have choice of one or two images, if one, render the img as a multiple, if two, render both images
// or maybe not, we'll see

export default function Hero({ userLayout }) {
  const { heroImg1, heroImg2, heroImg1Alt, heroImg2Alt} = userLayout
  return (
    <>
      <div style={{border:'2px solid black', display:'flex', flexDirection:'column', height:'fit-content', justifyContent:'center'}} className='hero-container'>
      
      <img style={{width:'300px', height:'200px'}} alt={heroImg1Alt} src={heroImg1} />
      <img style={{width:'300px', height:'200px'}} alt={heroImg2Alt} src={heroImg2} />
      </div>
    </>
  )
}