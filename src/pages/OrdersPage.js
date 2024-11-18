import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'

export default function OrdersPage() {
    const [fetchedOrders, setFetchedOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function fetchListFromAPI() {
        const token = JSON.parse(localStorage.getItem('UserInfo')).token;
        axios.get("http://localhost:5125/api/v1/Orders/UserOrders",
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                setFetchedOrders(response.data);
                setLoading(false);
            })
            .catch((e) => {
                enqueueSnackbar(e.response.data, { variant: 'error' });
                setLoading(false);
                setError(e);
            })
    }

    useEffect(() => {
        fetchListFromAPI();
    }, [loading]);

    if (loading) {
        return (
            <div>
                loading...
            </div>
        )
    }


    if (fetchedOrders) {
        return (
            <div>
                <p>Orders</p>
                <div style={{
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', flexDirection: 'column'
                }}>
                    {
                        fetchedOrders.map((order) =>
                            <Accordion key={order.orderId} style={{
                                display: 'flex', justifyContent: 'center',
                                alignItems: 'center', flexDirection: 'column',
                                width: '480px'
                            }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >

                                    {order.dateCreated}
                                </AccordionSummary>
                                <AccordionDetails>

                                    <div key={order.orderId}>

                                        <p>Order ID: {order.orderId}</p>
                                        <p>Date: {order.dateCreated.slice(0, order.dateCreated.indexOf('T'))}</p>
                                        <p>Time: {order.dateCreated.slice(order.dateCreated.indexOf('T') + 1, order.dateCreated.indexOf('.'))}</p>
                                        <p>Price: ${(Math.round(order.totalPrice * 100) / 100)}</p>
                                        <p>Status: {order.orderStatus}</p>

                                        {order.cart.cartItems.map((item) =>
                                            <div key={item.cartItemsId}>
                                                <span>{item.book.title}, Price: ${item.book.price}, Quantity: {item.quantity}
                                                </span>

                                            </div>
                                        )}
                                    </div>

                                </AccordionDetails>
                            </Accordion>
                        )
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <p>
                    {error.response.data.message}
                </p>
            </div>
        )
    }
}
