import React from 'react'

import logo from './images/BookIcon.png'
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom'
import Logout from '../User/Logout'

export default function NavBar({ user, setUser }) {
  // console.log("from navbar " + user.role);
  let isAuthenticated = user ? true : false;

  return (
    <div id={styles.headerDiv}>
      <header>
        <img className={styles.logo} src={logo} alt="Book Logo" />
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/cart">Cart</Link></li>

            {!(isAuthenticated) ?
              <li><Link to="/signIn">Sign In</Link></li>
              : <></>}

            {isAuthenticated ?
              <li><Link to="/profile">Profile</Link></li> :
              <></>}

            {isAuthenticated ?
              <li><Logout
                user={user}
                setUser={setUser}
              /></li>
              : <></>}

            {isAuthenticated && user.role === "Admin" ?
              <li><Link to="/dashboard">Dashboard</Link></li> :
              <></>
            }

          </ul>
        </nav>
      </header>
    </div>
  )
}
