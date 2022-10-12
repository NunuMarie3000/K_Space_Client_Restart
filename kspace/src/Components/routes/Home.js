import React, { useEffect, useState } from 'react'
import EditButton from '../layout/EditButton'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const location = useLocation()
  const data = location.state
  const [ layout, setLayout ] = useState(null);

  const userFromAuth = {
    email: data.email, 
    email_verified: data.email_verified,
    name: data.name,
    nickname: data.nickname,
    picture: data.picture,
    sub: data.sub,
    updated_at: data.updated_at
  }

  const getLayout = async (layoutid) => {
    // setSiteLoading(true)
    // /layout/:user
    const url = `${process.env.REACT_APP_SERVER}layout/${layoutid}`
    try {
      const response = await axios.get(url)
      setLayout(response.data[0])
      // setSiteLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    getLayout(data.userLayoutId)
  })
  // console.log(layout.fontBodyColor);

  return (
    <>
      {layout !== null && layout !== undefined && <EditButton USERID={layout.user} userInfoAuth={userFromAuth} userLayout={layout} />}
    </>
  )
}
