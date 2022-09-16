import React from 'react'

export default function Login({ loginWithRedirect }) {
  const handleClick = () => {
    loginWithRedirect()
  }
  return (
    <>
      <div className='login-page'>
      <h1>welcome to k_space <i className="fa-solid fa-users"></i></h1>
      <h3>Please login</h3>
      <button onClick={handleClick}>Login</button>
      </div>
    </>
  )
}
