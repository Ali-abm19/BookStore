import React from 'react'

import style from './HomePage.module.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  let navigate = useNavigate();
  return (
    <div className={style.hero}>

      <div>
        <h1>Welcome to the BookStore!</h1>
        <br />
        <h3>Explore our book collection and find new and exciting releases</h3>
      </div>

      <Button style={{ color: "4A7D9A", fontSize:"26px"}} variant="contained" onClick={() => navigate('/books')}>Buy Now</Button>

    </div>
  )
}
