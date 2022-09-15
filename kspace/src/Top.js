import React, { useState, useEffect } from 'react'
import App from './App'
import axios from 'axios'
// i need to make axios request here to get the user's layout info when they log in...

export default function Top() {
  const [userLayout, setLayout] = useState('')


  const getLayout = async () => {
    // /layout/:user
    const userId = process.env.REACT_APP_MY_ID
    const url = `${process.env.REACT_APP_SERVER}layout/${userId}`
    try {
      const response = await axios.get(url)
      setLayout(response.data[0])
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getLayout()
  }, [])
  return (
    <>
      <App userLayout={userLayout} getLayout={getLayout} />
    </>
  )
}
