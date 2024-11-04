import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'


export default function DashboardPage() {

  return (
    <div>
      <Link to="/dashboard/books">Books</Link>
      <Outlet />
    </div>
  )
}
