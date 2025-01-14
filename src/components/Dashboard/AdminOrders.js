import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import OrdersInDataGrid from '../Order/OrdersInDataGrid';
import { Google } from '@mui/icons-material';

export default function AdminOrders() {

    const [fetchedOrders, setFetchedOrders] = useState([]);
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/Orders`;
    const token = JSON.parse(localStorage.getItem('UserInfo')).token

    function deleteHandler(orderId) {
        axios.delete("https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/Orders/" + orderId,
            { headers: { Authorization: `Bearer ${token}` }, })
            .then((response) => {
                enqueueSnackbar(`Order was Deleted`, { variant: 'info' })
                fetchListFromAPI();
            }
            )
            .catch((error) => enqueueSnackbar(error.message, { variant: 'error' }))
    }


    function fetchUsersListFromAPI() {
        axios.get("https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/Users",
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                setFetchedUsers(response.data);

            })
            .catch((error) => {
                enqueueSnackbar("failed to fetch names", { variant: 'error' })
            })
    }

    function fetchListFromAPI() {
        axios.get(url,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                setFetchedOrders(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.response.data);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchUsersListFromAPI();
        fetchListFromAPI();
    }, [loading]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Admin Orders View</h1>
            <OrdersInDataGrid
                orders={fetchedOrders}
                fetchedUsers={fetchedUsers}
                setFetchedUsers={setFetchedUsers}
                deleteHandler={deleteHandler} />
        </div>
    )

}
