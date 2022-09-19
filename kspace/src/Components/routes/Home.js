import React, { useState, useEffect } from 'react'
import EditButton from '../layout/EditButton'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const location = useLocation()
  const data = location.state
  const [layout, setLayout] = useState('')

  const getLayout = async (id) => {
    // /layout/:user
    const url = `${process.env.REACT_APP_SERVER}layout/${id}`
    try {
      const response = await axios.get(url)
      setLayout(response.data[0])
      // setSiteLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

 useEffect(()=>{
  getLayout(data.user)
  //eslint-disable-next-line
 }, [])
  // needs userLayout, getLayout, and userInfoAuth
  return (
    <>
      {layout !== '' && <EditButton USERID={layout.user} userInfoAuth={data.userInfoAuth} userLayout={layout} getLayout={getLayout} />}
    </>
  )
}
