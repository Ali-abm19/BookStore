import React from 'react'

import CartList from '../components/Cart/CartList'

export default function CartPage({ user, cartBooks, setCartBooks }) {

        return (
            <div style={{marginBottom:'25px'}}>
            <CartList
                user={user}
                setCartBooks={setCartBooks}
                cartBooks={cartBooks}
            />
            </div>
        )
}
