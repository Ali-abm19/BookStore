import React from 'react'

export default function Product({ book }) {

  return (
    <div>
      <p>{book.title}</p>
      <p>{book.price}</p>
      <p>{book.author}</p>
      <p>{book.category.categoryName}</p>
    </div>
  )
}
