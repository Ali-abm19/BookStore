import React from 'react'

export default function Product({ book, quantity }) {

  return (
    <div>
      <img src={book.image} alt={book.title}></img>
      <p>{book.title}</p>
      <p>${(Math.round(book.price * quantity * 100) / 100) || book.price}</p>
    </div>
  )
}
