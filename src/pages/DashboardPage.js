import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import AdminProducts from '../components/Dashboard/AdminProducts'


export default function DashboardPage({user}) {

  return (
    <div>
      {/* <Link to="/dashboard/books">Books</Link>
      <Outlet /> */}
      <AdminProducts user={user} />
    </div>
    
  )
}
