import React, { useEffect, useState } from 'react'
import EditButton from './Components/layout/EditButton'
import axios from 'axios'
import LoadingPage from './Components/LoadingPage'

export default function App({ isSiteLoading, setSiteLoading, logout, user }) {
  const [userLayout, setLayout] = useState('')
  const [USERID, setUSERID] = useState('')
  const [weLoading, setWeLoading] = useState(false)
  // now that i have user on login, i can use it to get email and whatnot

  const getUserInfoFromDB = async () => {
    setWeLoading(true)
    const email = user.email
    const url = `${process.env.REACT_APP_SERVER}${email}`
    try {
      const res = await axios.get(url)
      if (res.data == null || res.data === undefined || res.data === '') {
        createUserId()
        console.log('create user id')
      } else {
        getLayout(res.data._id)
        setUSERID(res.data._id)
        console.log('we have an id ')
        console.log(res)
        setWeLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getLayout = async (id) => {
    // setSiteLoading(true)
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

  const createUserId = async () => {
    // we gonna have their email
    // server/new creates new user, need newUser = {username: user.name, email: user.email} post request
    const url = `${process.env.REACT_APP_SERVER}new`
    const body = {
      username: user.name,
      email: user.email
    }
    try {
      console.log('we creating a userID')
      const response = await axios.post(url, body)
      createDefaults(response.data._id)
    } catch (error) {
      console.log(error)
    }
  }
  const createDefaults = async (id) => {
    let urlArr = []
    //new profile-
    // /profile/:user
    const profileUrl = `${process.env.REACT_APP_SERVER}profile/${id}`
    // new layout-
    // /layout/:user
    const layoutUrl = `${process.env.REACT_APP_SERVER}layout/${id}`
    // new aboutme
    // /aboutme/:user
    const aboutmeUrl = `${process.env.REACT_APP_SERVER}aboutme/${id}`
    // new blog post
    // /newentry/:user
    const newblogUrl = `${process.env.REACT_APP_SERVER}newentry/${id}`
    // i can iterate through the array, and make post requests for all at once 
    urlArr.push(profileUrl, layoutUrl, aboutmeUrl, newblogUrl)
    try {
      console.log('we creating defaults')
      await axios.all(urlArr.map(url => axios.post(url)))
      console.log('user defaults created successfully!')
      getLayout(id)
      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }

  // const check = async () => {
  //   // if we have an account, getUserInfoFromDB()
  //   if(){
  //     getUserInfoFromDB()
  //   }else{
  //     createUserId()
  //   }
  //   // else createUser()
  // }

  useEffect(() => {
    getUserInfoFromDB()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      {weLoading && <LoadingPage />}
      {userLayout !== '' && <EditButton USERID={USERID} userInfoAuth={user} logout={logout} userLayout={userLayout} getLayout={getLayout} />}
    </>
  )
}
