import React from 'react'
import EditButton from './Components/layout/EditButton'

export default function App({ userLayout, getLayout, logout, userInfoAuth}) {

  return (
    <>
      {userLayout !== '' && <EditButton userInfoAuth={userInfoAuth} logout={logout} userLayout={userLayout} getLayout={getLayout} />}
    </>
  )
}
