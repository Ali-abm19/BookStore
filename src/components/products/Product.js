import React from 'react'

export default function Product({ book, quantity }) {

  return (
    <div>
      <img src={book.image} alt={book.title}></img>
      <p>{book.title}</p>
      <p>${book.price * quantity || book.price}</p>
    </div>
  )
}
