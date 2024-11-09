import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingPage from './Components/LoadingPage'
import Navigation from './Components/body/Navigation'
import Welcome from './Components/routes/Welcome'
import Home from './Components/routes/Home'
import Blog from './Components/routes/Blog'
import EditBlog from './Components/routes/EditBlog'
import About from './Components/routes/About'
import { Routes, Route } from 'react-router-dom'

export default function App({ logout, user }) {
  const [userLayout, setLayout] = useState(null)
  const [userId, setUserId] = useState(null)
  const [weLoading, setWeLoading] = useState(false)
  // now that i have user on login, i can use it to get email and whatnot

  const getUserInfoFromDB = async () => {
    console.log('getUserInfoFromDB - user:', user);
    setWeLoading(true)
    const email = user.email
    try {
      const url = `${process.env.REACT_APP_SERVER}${email}`
      const res = await axios.get(url);
      console.log('getUserInfoFromDB response:', res.data);
      
      if (!res.data) {
        // New user flow - just create defaults since user already exists
        await createDefaults(user.sub) // user.sub contains the user._id from registration
        await getLayout(user.sub)
        setUserId(user.sub)
      } else {
        // Existing user flow
        setUserId(res.data._id)
        await getLayout(res.data._id)
      }
    } catch (error) {
      console.log('Error in getUserInfoFromDB:', error)
    } finally {
      setWeLoading(false)
    }
  }
  const getLayout = async (id) => {
    const url = `${process.env.REACT_APP_SERVER}layout/${id}`
    try {
      const response = await axios.get(url)
      console.log('getLayout response:', response.data)
      
      if (!response.data || response.data.length === 0) {
        // No layout found, create defaults
        console.log('No layout found, creating defaults...')
        await createDefaults(id)
        // Try getting layout again after creating defaults
        const newResponse = await axios.get(url)
        setLayout(newResponse.data[0])
      } else {
        setLayout(response.data[0])
      }
    } catch (error) {
      console.error('Error in getLayout:', error.message)
      // Optionally create defaults here if the error is a 404
      if (error.response?.status === 404) {
        console.log('Layout not found, creating defaults...')
        await createDefaults(id)
        const newResponse = await axios.get(url)
        setLayout(newResponse.data[0])
      }
    }
  }

  const createDefaults = async (id) => {
    console.log('Creating defaults for user:', id);
    const urlArr = [
      `${process.env.REACT_APP_SERVER}profile/${id}`,
      `${process.env.REACT_APP_SERVER}layout/${id}`,
      `${process.env.REACT_APP_SERVER}aboutme/${id}`,
      `${process.env.REACT_APP_SERVER}newentry/${id}`
    ]
    
    try {
      await Promise.all(urlArr.map(url => axios.post(url)))
      console.log('Default user data created successfully!')
      return true
    } catch (error) {
      console.error('Error creating defaults:', error.message)
      return false
    }
  }

  useEffect(() => {
    getUserInfoFromDB()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      {weLoading && <LoadingPage />}

      {userLayout && (
        <>
          <Navigation userID={userId} userInfoAuth={user} logout={logout} userLayout={userLayout} />
          <Routes>
            <Route path="/" element={<Welcome userLayout={userLayout} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/editblog" element={<EditBlog />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </>
      )}
    </>
  )
}
