import React from 'react'

export default function Welcome({ userLayout }) {
  return (
    <>
      <div style={{
        fontFamily: "'Michroma', sans-serif",
        backgroundColor: userLayout ? userLayout.backColor : '#fff',
        backgroundImage: userLayout ? `url(${userLayout.backImage})` : 'none',
        color: userLayout ? userLayout.fontBodyColor : 'black',
        height: '100%',
        width:'100%',
        position: 'absolute',
        padding: '60px 15px 0 15px',
        textAlign:'center'
      }}>
        <h1 >welcome to k_space</h1>
      </div>

    </>
  )
}
