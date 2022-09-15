import React from 'react'

export default function Latest({ blogs }) {
  return (
    <>
      <div style={{border:'1px solid black', padding:"1rem .5rem", borderRadius:'1%/5%'}}>
        <h5 style={{fontFamily:"'Michroma', sans-serif"}}>{blogs[0].title}</h5>
        <p>{blogs[0].body}</p>
      </div>
    </>
  )
}