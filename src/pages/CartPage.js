import React, { useEffect, useState } from 'react'
import CartList from '../components/Cart/CartList'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import CartListBackend from '../components/Cart/CartListBackend';

export default function CartPage({ user, cartBooks, setCartBooks }) {
    //const navigate = useNavigate();
    // const [loggedIn, setLoggedIn] = useState(false);

    // if (loggedIn) {
    //     return (
    //         <CartListBackend
    //             user={user}
    //             cartBooks={cartBooks}
    //             setCartBooks={setCartBooks}
    //             setLoggedIn={setLoggedIn}
    //         />
    //     )
    // }

        return (
            <CartList
                user={user}
                setCartBooks={setCartBooks}
                cartBooks={cartBooks}
            />
        )
}
