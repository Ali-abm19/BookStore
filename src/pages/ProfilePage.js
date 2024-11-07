import React from 'react'
import ProfileInfo from '../components/User/ProfileInfo'

export default function ProfilePage({ user, setUser }) {

  if (user !== null) {
    return (
      <ProfileInfo
        user={user}
        setUser={setUser}
      ></ProfileInfo>
    )
  }
}
