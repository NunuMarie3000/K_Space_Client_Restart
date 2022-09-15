import React from 'react'
import EditButton from './Components/layout/EditButton'

export default function App({ userLayout, getLayout}) {

  return (
    <>
      {userLayout !== '' && <EditButton userLayout={userLayout} getLayout={getLayout} />}
    </>
  )
}
