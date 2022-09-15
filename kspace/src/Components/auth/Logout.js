import React from 'react'

export default function Logout({logout}) {
  return (
    <>
      <div>
      <button onClick={logout} >Logout</button>
      </div>
    </>
  )
}