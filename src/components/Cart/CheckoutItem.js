import React from 'react'

export default function CheckoutItem({ element }) {
    return (
        <div style={{
            display: 'flex', justifyContent:'normal',
            flexDirection:'column'

        }}>
            <p>{element.book.title}</p>
            <p style={{marginTop:'-5px'}}>Price: ${element.price}</p>
            <p style={{ marginTop: '-5px' }}>Quantity: {element.quantity}</p>
        </div>
    )
}
