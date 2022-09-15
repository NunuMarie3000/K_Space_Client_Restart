import React from 'react'

export default function Latest({ blogs }) {
  return (
    <>
      <div style={{border:'2px solid black'}}>
        <h5>{blogs[0].title}</h5>
        <p>{blogs[0].body}</p>
      </div>
    </>
  )
}