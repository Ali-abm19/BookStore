import React, { useState } from 'react'
import Product from '../products/Product';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';

export default function CartList({ user, cartBooks, setCartBooks, cartFromDB }) {

    // if (cartFromDB.cartItems.length > 0 && cartBooks.length === 0) {
    //     setCartBooks(cartFromDB.map((elem) => {
    //         return ({ quantity: elem.quantity, book: elem.book })
    //     }))
    // }

    console.log(cartFromDB.cartItems);
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

    function submitToBackend(cartBooks) {
        if (user != null) {
            cartBooks.map((item) => {
                axios.post("http://localhost:5125/api/v1/CartItems", {
                    bookId: item.book.bookId,
                    cartId: cartFromDB.cartId,
                    quantity: item.quantity

                })
                    .then((response) => {
                        console.log(response)
                        //setCartFromDB(response.data.cart)
                    }
                    )
                    .catch((error) => {
                        console.log(error)
                    })
            })
        }
        else
            enqueueSnackbar("please sign-in first", { variant: 'error' });
    }

    function deleteBook(id) {
        setCartBooks(cartBooks.filter((items) => items.book.bookId !== id))
    }

    console.log(cartBooks);

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
            <Button color='F5EDF0' variant="outlined" onClick={() => (submitToBackend(cartBooks))}>Submit</Button>

        </div>
    )
}

