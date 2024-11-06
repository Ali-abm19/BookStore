import React, { useEffect, useState } from 'react'
import CartList from '../components/Cart/CartList'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

export default function CartPage({ user, cartBooks, setCartBooks }) {
    const [cartFromDB, setCartFromDB] = useState();
    const [loadingCart, setLoadingCart] = useState(true);
    const navigate = useNavigate();
    // function goToBooks(){
    //     navigate('/cart')
    // }
    function createCart() {
        if (user !== null) {
            axios.post("http://localhost:5125/api/v1/Carts", { "userId": user.userId })
                .then((response) => {
                    console.log(response)
                    setCartFromDB(response.data.cart)
                    setLoadingCart(false)
                }
                )
                .catch((error) => {
                    console.log(error)
                    setLoadingCart(false)
                })
        }
        else {
            enqueueSnackbar('you should sign-in before using the cart', { variant: 'error' })
            setLoadingCart(false);
        }
    }
    useEffect(() => {
        createCart();
    }, [loadingCart]);


    if (loadingCart === true) {
        return (
            <div>
                Loading Cart...
            </div>
        )
    }

    if (cartBooks.length === 0 || cartBooks === null) {
        return (
            <div>
                <h1>The Cart is empty</h1>
                <Button color='F5EDF0' variant="outlined" onClick={() => navigate('/books')}>Explore Books</Button>
            </div>
        )
    }
    return (
        <CartList
            user={user}
            setCartBooks={setCartBooks}
            cartBooks={cartBooks}
            cartFromDB={cartFromDB}
        />
    )
}
