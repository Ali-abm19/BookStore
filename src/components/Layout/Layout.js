import React from 'react'

import NavBar from '../navbar/NavBar'
import { Outlet } from 'react-router-dom'

export default function Layout({ user, setUser }) {
    return (
        <div>
            <NavBar
                user={user}
                setUser={setUser}
            />
            <Outlet />

        </div>
    )
}
