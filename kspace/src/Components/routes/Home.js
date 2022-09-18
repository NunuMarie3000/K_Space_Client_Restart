import React from 'react'
import EditButton from '../layout/EditButton'
import { useLocation } from 'react-router-dom'

export default function Home() {
  const location = useLocation()
  const allData = location.state
  console.log(allData)
  return (
    <>
      <EditButton USERID={allData.userLayout.user} userInfoAuth={allData.userInfoAuth} logout={allData.logout} userLayout={allData.userLayout} getLayout={allData.getLayout} />
    </>
  )
}
