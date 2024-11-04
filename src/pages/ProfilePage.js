import React from 'react'
import ProfileInfo from '../components/User/ProfileInfo'

export default function ProfilePage({ user, setUser }) {
  return (
    <ProfileInfo
      user={user}
      setUser={setUser}
    ></ProfileInfo>
  )
}
