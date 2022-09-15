// profile component
// will hold:
// profile pic -editable, so put/patch request, name, bio, mood
// maybe everything in profile is editable with one modal, so only one put/patch request- one modal can edit profile pic, bio, and mood
import React, { useState } from 'react'
import EditProfile from './EditProfile'

export default function Profile({ id, username, profilePic, profile }) {
  const [isEditBtnClicked, setIsEditBtnClicked] = useState('')

  const handleClick = () => {
    setIsEditBtnClicked(!isEditBtnClicked)
  }

  return (
    <>
      <div className='profile-container' style={{ border: '2px solid black' }}>
        {/* <h1>{username}</h1> */}
        {/*profile pic */}
        <div style={{display:'flex'}}>
        <img style={{ width: '250px', height: '150px' }} className='profile-pic'
          alt='a profile'
        />

        {/*bio/mood/profilepic will come later, they need to create an account and create a bio after, this'll be saved in userInfo collection in db */}
        {/*bio */}
        <p>{profile.profile}</p>
        </div>
        {/*mood */}
        <h5>{profile.mood}</h5>
        <div className='edit-me-brackets' onClick={handleClick}>[Edit Me]</div>

        <EditProfile isEditBtnClicked={isEditBtnClicked} handleClick={handleClick} id={id} profile={profile.profile} mood={profile.mood} />

      </div>
    </>
  )
}