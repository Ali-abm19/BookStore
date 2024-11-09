import React, { useEffect, useState } from 'react'
import CartList from '../components/Cart/CartList'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import CartListBackend from '../components/Cart/CartListBackend';

export default function CartPage({ user, cartBooks, setCartBooks }) {
    const navigate = useNavigate();
    const[ loggedIn, setLoggedIn] = useState(false);

    if (cartBooks.length === 0 || cartBooks === null) {
        return (
            <div>
                <h1>The Cart is empty</h1>
                <Button color='F5EDF0' variant="outlined" onClick={() => navigate('/books')}>Explore Books</Button>
            </div>
        )
    }
    if(loggedIn){
        return(
            <CartListBackend
                user={user}
                cartBooks={cartBooks}
            />
        )
    }

    else
    return (
        <CartList
            user={user}
            setCartBooks={setCartBooks}
            cartBooks={cartBooks}
            setLoggedIn={setLoggedIn}
        />
    )
}
