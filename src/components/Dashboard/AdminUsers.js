import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import UsersInDataGrid from '../User/UsersInDataGrid';

export default function AdminUsers() {
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `http://localhost:5125/api/v1/Users`;
    const token = JSON.parse(localStorage.getItem('UserInfo')).token

    function deleteHandler(user) {
        axios.delete("http://localhost:5125/api/v1/Users/" + user,
            { headers: { Authorization: `Bearer ${token}` }, })
            .then((response) => enqueueSnackbar(`User was Deleted`, { variant: 'info' })
            )
            .catch((error) => enqueueSnackbar(error.message, { variant: 'error' }))
        fetchListFromAPI();
    }

    function fetchListFromAPI() {
        axios.get(url,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                setFetchedUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch the users");
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
            <h1>Admin Users View</h1>
            <UsersInDataGrid users={fetchedUsers} deleteHandler={deleteHandler} />
        </div>
    )
}