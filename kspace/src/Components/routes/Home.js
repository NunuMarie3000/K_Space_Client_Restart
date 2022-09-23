import React from 'react'
import EditButton from '../layout/EditButton'
import { useLocation } from 'react-router-dom'

export default function Home() {
  const location = useLocation()
  const data = location.state

  const layout = {
    backColor: data.backColor,
    backImage: data.backImage,
    fontBodyColor: data.fontBodyColor,
    heroImg1: data.heroImg1,
    heroImg1Alt: data.heroImg1Alt,
    heroImg2: data.heroImg2,
    heroImg2Alt: data.heroImg2Alt,
    user: data.user,
    _id: data._id
  }

  const userFromAuth = {
    email: data.email, 
    email_verified: data.email_verified,
    name: data.name,
    nickname: data.nickname,
    picture: data.picture,
    sub: data.sub,
    updated_at: data.updated_at
  }

  return (
    <>
      {layout !== '' && <EditButton USERID={layout.user} userInfoAuth={userFromAuth} userLayout={layout} />}
    </>
  )
}
