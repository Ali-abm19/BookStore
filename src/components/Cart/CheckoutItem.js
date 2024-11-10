import React from 'react'

export default function CheckoutItem({ element }) {
    return (
        <div style={{
            marginTop: '4px',
            display: 'flex', flexDirection: 'column'
        }}>
            <p>{element.book.title}</p>
            <p>Price: ${element.price}</p>
            <p>Quantity: {element.quantity}</p>
        </div>
    )
}
