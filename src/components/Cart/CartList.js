import React, { useState } from 'react'
import Product from '../products/Product';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';


export default function CartList({ user, cartBooks, setCartBooks, setLoggedIn }) {

    function increaseAmount(id) {
        setCartBooks(cartBooks.map((elem) => {
            if (id === elem.book.bookId) {
                if (elem.book.stockQuantity >= elem.quantity + 1) {
                    elem.quantity++;
                }
                else {
                    enqueueSnackbar('you have exceeded the available stock', { variant: 'warning' })
                }
            }
            return elem
        }));
    }
    function decreaseAmount(id) {
        setCartBooks(cartBooks.map((elem) => {
            if (id === elem.book.bookId) {
                if (elem.quantity - 1 === 0) {
                    elem.quantity = 1;
                }
                else
                    elem.quantity--;
            }
            return elem
        }));
    }

    function deleteBook(id) {
        setCartBooks(cartBooks.filter((items) => items.book.bookId !== id))
    }

    function checkOut() {
        if (!user) {
            enqueueSnackbar("please sign-in first", { variant: 'error' });
        }
        else {
            setLoggedIn(true);
        }
    }

    return (
        <div>
            {cartBooks.map((element) =>
                <div key={element.book.bookId}>
                    <Product book={element.book}></Product>
                    <p>{element.quantity}</p>
                    <Button color='F5EDF0' variant="outlined" onClick={() => (increaseAmount(element.book.bookId))}>+</Button>
                    <Button color='F5EDF0' variant="outlined" onClick={() => (decreaseAmount(element.book.bookId))}>-</Button>
                    <br></br>
                    <Button color='F5EDF0' variant="outlined" onClick={() => (deleteBook(element.book.bookId))}>Remove</Button>
                </div>
            )}
            <Button color='F5EDF0' variant="outlined" onClick={() => checkOut()}>Checkout</Button>

        </div>
    )
}
