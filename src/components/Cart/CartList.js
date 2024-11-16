import React, { useState } from 'react'
import Product from '../products/Product';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function CartList({ user, cartBooks, setCartBooks }) {
    const navigate = useNavigate();

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

            navigate('/cart/checkout');
        }
    }

    if (cartBooks.length === 0 || cartBooks === null) {
        return (
            <div>
                <h1>The Cart is Empty</h1>
                <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => navigate('/books')}>Explore Books</Button>
                <h3>Or checkout if you already have items from a previous session</h3>
                <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => checkOut()}>Checkout</Button>

            </div>
        )
    }

    else
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                    {cartBooks.map((element) =>
                        <div key={element.book.bookId}>
                            <div>
                                <Product book={element.book} quantity={element.quantity}></Product>
                                <p>{element.quantity}</p>
                                <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => (increaseAmount(element.book.bookId))}>+</Button>
                                <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => (decreaseAmount(element.book.bookId))}>-</Button>
                                <br></br>
                                <Button style={{ color: "4A7D9A", maxHeight: '120px' }} variant="outlined" onClick={() => (deleteBook(element.book.bookId))}>Remove</Button>
                            </div>
                        </div>
                    )}
                </div>
                <br></br>
                <Button style={{ color: "4A7D9A" }} variant="contained" onClick={() => checkOut()}>Checkout</Button>

            </div>
        )
}

