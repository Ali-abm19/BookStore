import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import CheckoutItem from './CheckoutItem';

export default function CartListBackend({ user, cartBooks, setCartBooks, setLoggedIn }) {

  const [cartFromDB, setCartFromDB] = useState();
  const [loadingCart, setLoadingCart] = useState(true);
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  //functions

  function createCart() {
    if (user !== null) {
      axios.post("http://localhost:5125/api/v1/Carts", { "userId": user.userId })
        //note that this method will NOT create a cart if the user already have one
        //instead it will return the previous cart
        .then((response) => {
          setCartFromDB(response.data)
          setLoadingCart(false)
          // if (cartBooks.length > 0)
          submitAllItemsToBackend(cartBooks);
          // setCartBooks();

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
            getCart(cartFromDB.cartId);
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

  async function getCart(id) {
    try {
      const response = await axios.get("http://localhost:5125/api/v1/Carts/" + id,
        { headers: { Authorization: `Bearer ${token}` }, }
      )
      setCartFromDB(response.data)
      console.log(response);

    }
    catch (error) {
      console.log(error);
    }
  }

  async function updateCartItem(id, newQuantity) {
    try {
      const response = await axios.put("http://localhost:5125/api/v1/CartItems/" + id, { "quantity": newQuantity }, { headers: { Authorization: `Bearer ${token}` }, })
      const data = response;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
    cartFromDB.cartItems.map(async (elem) => {
      if (id === elem.book.bookId) {
        if (elem.book.stockQuantity >= elem.quantity + 1) {
          elem.quantity++;
          updateCartItem(elem.cartItemsId, elem.quantity)
          await getCart(cartFromDB.cartId);
        }
        else {
          enqueueSnackbar('you have exceeded the available stock', { variant: 'warning' })
        }
      }
      return elem
    });
  }

  function decreaseAmount(id) {
    console.log(cartFromDB.cartItems);
    cartFromDB.cartItems.map(async (elem) => {
      if (id === elem.book.bookId) {
        if (elem.quantity - 1 === 0) {
          elem.quantity = 1;
        }
        else {
          elem.quantity--;
          await updateCartItem(elem.cartItemsId, elem.quantity);
          await getCart(cartFromDB.cartId);
        }
      }
      return elem
    });

  }

  console.log(cartFromDB);

  async function deleteBook(id) {
    deleteCartItem(cartFromDB.cartItems.find((items) => items.book.bookId === id).cartItemsId);
    await getCart(cartFromDB.cartId);
  }

  async function placeOrder() {
    try {
      const response = await axios.post("http://localhost:5125/api/v1/Orders", { "cartId": cartFromDB.cartId }, { headers: { Authorization: `Bearer ${token}` }, })
      const data = response;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }



  //execution
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

  if (cartFromDB) {
    return (
      <div>
        {cartFromDB.cartItems.map((element) =>
          <div key={element.book.bookId}>
            <CheckoutItem element={element} />
            {/* <Product book={element.book}></Product>
            <p>{element.quantity}</p> */}


            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => (increaseAmount(element.book.bookId))}>+</Button>
            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => (decreaseAmount(element.book.bookId))}>-</Button>
            <br></br>
            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => (deleteBook(element.book.bookId))}>Remove</Button>
          </div>
        )}
        <div style={{ marginBottom: '1px' }}>
          <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => (placeOrder(cartFromDB))}>Place Order</Button>
          <Button style={{ color: "4A7D9A", backgroundColor:"red" }} variant="contained" onClick={() => {
            setCartFromDB(null);
            setLoggedIn(false);
            navigate('/books');
          }
          }>Cancel</Button>
        </div>

      </div>
    )
  }
  else {
    <div>loading...</div>
  }
}


