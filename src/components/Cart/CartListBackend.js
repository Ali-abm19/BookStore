import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import Product from '../products/Product';

export default function CartListBackend({ user, cartBooks }) {

  const [cartFromDB, setCartFromDB] = useState();
  const [loadingCart, setLoadingCart] = useState(true);
  const token = localStorage.getItem('token')

  //functions

  function createCart() {
    if (user !== null) {
      axios.post("http://localhost:5125/api/v1/Carts", { "userId": user.userId })
        //note that this method will NOT create a cart if the user already have one
        //instead it will return the previous cart
        .then((response) => {
          setCartFromDB(response.data)
          setLoadingCart(false)
          submitAllItemsToBackend(cartBooks);
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

  function deleteCart(cartId) { //this is for deleting the whole cart. currently not used
    axios.delete("http://localhost:5125/api/v1/Carts", { "cartId": cartId })

      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function submitAllItemsToBackend(cartBooks) {
    if (user != null) {
      cartBooks.map((item) => {
        axios.post("http://localhost:5125/api/v1/CartItems", {
          bookId: item.book.bookId,
          cartId: cartFromDB.cartId,
          quantity: item.quantity

        })
          .then((response) => {
            console.log(response)
            // setCartFromDB(response.data.cart)
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

  function getCart(id) {
    axios.get("http://localhost:5125/api/v1/Cart/" + id,
      { headers: { Authorization: `Bearer ${token}` }, }
    )
      .then((response) => {
        setCartFromDB(response.data)
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateCartItem(id, newQuantity) {
    axios.put("http://localhost:5125/api/v1/CartItems/" + id,
      { "quantity": newQuantity },
      { headers: { Authorization: `Bearer ${token}` }, }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteCartItem(id) {
    axios.delete("http://localhost:5125/api/v1/CartItems/" + id,
      { headers: { Authorization: `Bearer ${token}` }, }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function increaseAmount(id) {
    setCartFromDB(cartFromDB.cartItems.map((elem) => {
      if (id === elem.book.bookId) {
        if (elem.book.stockQuantity >= elem.quantity + 1) {
          elem.quantity++;
          updateCartItem(elem.cartItemsId, elem.quantity)
        }
        else {
          enqueueSnackbar('you have exceeded the available stock', { variant: 'warning' })
        }
      }
      return elem
    }));
  }
  function decreaseAmount(id) {
    console.log(cartFromDB.cartItems);
    setCartFromDB(cartFromDB.cartItems.map((elem) => {
      if (id === elem.book.bookId) {
        if (elem.quantity - 1 === 0) {
          elem.quantity = 1;
        }
        else {
          elem.quantity--;
          updateCartItem(elem.cartItemsId, elem.quantity);
          getCart(cartFromDB.cartId);
        }
      }
      return elem
    }));
  }

  function deleteBook(id) {
    setCartFromDB(cartFromDB.filter((items) => items.book.bookId !== id))
    deleteCartItem(id);
    getCart(cartFromDB.cartId);

  }



  //execution
  useEffect(() => {
    createCart();
  }, [loadingCart]);

  // useEffect(() => {
  //   submitAllItemsToBackend(cartBooks);
  // }, []);


  if (loadingCart === true) {
    return (
      <div>
        Loading Cart...
      </div>
    )
  }

  return (
    <div>
      {cartFromDB.cartItems.map((element) =>
        <div key={element.book.bookId}>
          <Product book={element.book}></Product>
          <p>{element.quantity}</p>
          <Button color='F5EDF0' variant="outlined" onClick={() => (increaseAmount(element.book.bookId))}>+</Button>
          <Button color='F5EDF0' variant="outlined" onClick={() => (decreaseAmount(element.book.bookId))}>-</Button>
          <br></br>
          <Button color='F5EDF0' variant="outlined" onClick={() => (deleteBook(element.book.bookId))}>Remove</Button>
        </div>
      )}
      {/* <Button color='F5EDF0' variant="outlined" onClick={() => (placeOrder(cartFromDB))}>Order</Button> */}

    </div>
  )
}


