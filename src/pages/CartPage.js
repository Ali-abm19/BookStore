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
                //note that this method will NOT create a cart if the user already have one
                //instead it will return the previous cart
                .then((response) => {
                    console.log(response)
                    setCartFromDB(response.data)
                    if (cartBooks.length === 0) {
                        if (cartFromDB && cartFromDB.cartItems.length > 0) {
                            setCartBooks(cartFromDB.cartItems)
                            //this segment will overwrite the cart in the 
                            //frontend with the cart from the backend if
                            //the cart in the frontend is empty, the user
                            //is signed in, and his backend cart has content
                        }
                    }
                    // else { //frontend cart is populated
                    //     if (cartFromDB.cartItems.length !== 0) { //to prevent infinite loop
                    //         deleteCart(cartFromDB.cartId); //delete the cart in the backend
                    //         //createCart() //create a new cart
                    //     }
                    // }
                    setLoadingCart(false)
                }
                )
                .catch((error) => {
                    console.log(error)
                    setLoadingCart(false)
                })
        }
        else {
            setLoadingCart(false);
        }
    }
    useEffect(() => {
        createCart();
    }, [loadingCart]);
    console.log(cartFromDB);

    function deleteCart(cartId) {
        axios.delete("http://localhost:5125/api/v1/Carts", { "cartId": cartId })

            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
