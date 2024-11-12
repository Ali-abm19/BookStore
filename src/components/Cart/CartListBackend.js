import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import CheckoutItem from './CheckoutItem';

export default function CartListBackend({ user, cartBooks, setCartBooks }) {

  const [cartFromDB, setCartFromDB] = useState();
  const [loadingCart, setLoadingCart] = useState(true);
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  //functions

  function createCart() {
    if (user !== null) {
      axios.post("https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/Carts", { "userId": user.userId })
        //note that this method will NOT create a cart if the user already have one
        //instead it will return the previous cart
        //new: unless the previous cart was made into an Order
        .then((response) => {
          setCartFromDB(response.data)
          setLoadingCart(false)
          submitAllItemsToBackend(cartBooks);
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
          setLoadingCart(false)
        })
    }
    else {
      setLoadingCart(false);
    }
  }

  function submitAllItemsToBackend(cartBooks) {
    if (user != null) {
      cartBooks.map((item) => {
        axios.post("https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/CartItems", {
          bookId: item.book.bookId,
          cartId: cartFromDB.cartId,
          quantity: item.quantity

        })
          .then((response) => {
            console.log(response.data)
            enqueueSnackbar("a book was added to the cart", { variant: 'success' });
            getCart(cartFromDB.cartId);
          }
          )
          .catch((error) => {
            enqueueSnackbar(error.message, { variant: 'error' });
          })
      })
    }
    else
      enqueueSnackbar("please sign-in first", { variant: 'error' });
  }

  async function getCart(id) {
    try {
      const response = await axios.get("https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/Carts/" + id,
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
      const response = await axios.put("https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/CartItems/" + id, { "quantity": newQuantity }, { headers: { Authorization: `Bearer ${token}` }, })
      const data = response;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCartItem(id) {
    try {
      const response = axios.delete("https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/CartItems/" + id,
        { headers: { Authorization: `Bearer ${token}` }, }
      )
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  }

  function increaseAmount(id) {
    cartFromDB.cartItems.map(async (elem) => {
      if (id === elem.book.bookId) {
        if (elem.book.stockQuantity >= elem.quantity + 1) {
          elem.quantity++;
          await updateCartItem(elem.cartItemsId, elem.quantity)
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

  async function deleteBook(id) {
    deleteCartItem(cartFromDB.cartItems.find((items) => items.book.bookId === id).cartItemsId);
    await getCart(cartFromDB.cartId);
  }

  async function placeOrder() {
    try {
      const response = await axios.post("https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/Orders", { "cartId": cartFromDB.cartId }, { headers: { Authorization: `Bearer ${token}` }, })
      enqueueSnackbar('Order Created', { variant: 'success' });
      setCartFromDB(null);
      setCartBooks([])
      navigate('/Home');
    } catch (error) {
      enqueueSnackbar(error.response.data.message || error.message, { variant: 'error' })
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
      <div style={{
        display: 'flex', justifyContent: 'space-evenly',
        alignItems: 'center'
      }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          {cartFromDB.cartItems.map((element) =>

            <div key={element.book.bookId}>
              <CheckoutItem element={element} />
              <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => (increaseAmount(element.book.bookId))}>+</Button>
              <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => (decreaseAmount(element.book.bookId))}>-</Button>



              <br></br>
              <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => (deleteBook(element.book.bookId))}>Remove</Button>

            </div>
          )}
        </div >
        <div style={{ marginBottom: '1px' }}>

          <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => (placeOrder(cartFromDB))}>Place Order</Button>
          <br></br>
          <Button style={{ color: "4A7D9A", backgroundColor: "red" }} variant="contained" onClick={() => {
            setCartFromDB(null);
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


