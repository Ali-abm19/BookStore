import React from 'react'

import logo from './images/BookIcon.png'
import styles from './NavBar.module.css'

export default function NavBar() {
  return (
    <div id={styles.headerDiv}>
      <header>
        <img className={styles.logo} src={logo} alt="Book Logo" />
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/books">Products</a></li>
            <li><a href="/hell">?</a></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
