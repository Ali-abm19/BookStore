import React from 'react'
import CartListBackend from '../components/Cart/CartListBackend'

export default function CheckoutPage({ user, cartBooks, setCartBooks }) {
    return (
        <div style={{ marginBottom: '25px' }}>
            <CartListBackend
                user={user}
                cartBooks={cartBooks}
                setCartBooks={setCartBooks}
            />

        </div>
    )
}
