import React from 'react'
import CartListBackend from '../components/Cart/CartListBackend'

export default function CheckoutPage({ user, cartBooks, setCartBooks }) {
    return (
        <div>
            <CartListBackend
                user={user}
                cartBooks={cartBooks}
                setCartBooks={setCartBooks}
            />

        </div>
    )
}
