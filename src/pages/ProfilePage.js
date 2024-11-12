import React from 'react'
import ProfileInfo from '../components/User/ProfileInfo'

export default function ProfilePage({ user, setUser }) {

  if (user !== null) {
    return (
      <div style={{marginBottom:'25px'}}>
      <ProfileInfo
        user={user}
        setUser={setUser}
      ></ProfileInfo>
      </div>
    )
  }
}
