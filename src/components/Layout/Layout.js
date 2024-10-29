import React from 'react'

import NavBar from '../navbar/NavBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div>
            <NavBar />
            <Outlet />

        </div>
    )
}
