import React from 'react'
import Products from '../components/products/Products'

export default function ProductsPage({ setCartBooks, cartBooks }) {
  return (
    <div>
      <Products
        setCartBooks={setCartBooks}
        cartBooks={cartBooks}
      />
    </div>
  )
}
