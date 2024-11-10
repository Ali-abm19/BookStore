import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import OrdersInDataGrid from '../Order/OrdersInDataGrid';

export default function AdminOrders() {

        const [fetchedOrders, setFetchedOrders] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const url = `http://localhost:5125/api/v1/Orders`;
        const token = localStorage.getItem("token");

        // function deleteHandler(user) {
        //     axios.delete("http://localhost:5125/api/v1/Users/" + user,
        //         { headers: { Authorization: `Bearer ${token}` }, })
        //         .then((response) => enqueueSnackbar(`User was Deleted`, { variant: 'info' })
        //         )
        //         .catch((error) => enqueueSnackbar(error.message, { variant: 'error' }))
        //     fetchListFromAPI();
        // }

        function fetchListFromAPI() {
            axios.get(url,
                { headers: { Authorization: `Bearer ${token}` } }
            )
                .then((response) => {
                    setFetchedOrders(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError("Failed to fetch the orders");
                    setLoading(false);
                })
        }

        useEffect(() => {
            fetchListFromAPI();
        }, []);

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>{error}</p>;
        }

        return (
            <div>
                <h1>Admin Orders view</h1>
                <OrdersInDataGrid orders={fetchedOrders}/>
            </div>
        )
    
}
