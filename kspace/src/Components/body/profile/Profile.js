// profile component
// will hold:
// profile pic -editable, so put/patch request, name, bio, mood
// maybe everything in profile is editable with one modal, so only one put/patch request- one modal can edit profile pic, bio, and mood
import React, { useState } from 'react'
import EditProfile from './EditProfile'

export default function Profile({ id, profile, userInfoAuth, getProfile }) {
  const [isEditBtnClicked, setIsEditBtnClicked] = useState('')

  const handleClick = () => {
    setIsEditBtnClicked(!isEditBtnClicked)
  }

  return (
    <>
      <div className='profile-container' style={{ border: '2px solid black', borderRadius: '4%/5%' }}>
        <h1 style={{fontFamily:"'Michroma', sans-serif", fontSize:'30px'}}>{profile.username && profile.username !== ' ' ? profile.username : userInfoAuth.name}</h1>
        {/*profile pic */}
        <div style={{ display: 'flex', gap:'10px' }}>
          <img style={{ width: '250px', height: '150px', borderRadius: '2%' }} className='profile-pic'
            alt='a profile' src={profile.profilePic ? profile.profilePic : userInfoAuth.picture}
          />
          {/*bio */}
          <p>{profile.profile}</p>
        </div>
        {/*mood */}
        <h5>{profile.mood}</h5>
        <div className='edit-me-brackets' onClick={handleClick}>[Edit Me]</div>

        <EditProfile authProfilePic={userInfoAuth.picture} authUsername={userInfoAuth.name} username={profile.username} profilePic={profile.profilePic} getProfile={getProfile} isEditBtnClicked={isEditBtnClicked} handleClick={handleClick} id={id} profile={profile.profile} mood={profile.mood} />

      </div>
    </>
  )
}