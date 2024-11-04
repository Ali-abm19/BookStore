import React from 'react'

import logo from './images/BookIcon.png'
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div id={styles.headerDiv}>
      <header>
        <img className={styles.logo} src={logo} alt="Book Logo" />
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/books">Products</Link></li>
            <li><Link to="/signIn">Account</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
