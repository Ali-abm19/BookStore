import { Button } from '@mui/material'
import { enqueueSnackbar } from 'notistack';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout({ user, setUser }) {
    const navi = useNavigate()

    function signOutHandler() {
        setUser(null);
        localStorage.setItem("token", "");
        enqueueSnackbar('You successfully signed out!', { variant: 'success' });
        navi("/home");
    }
    return (
        <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={signOutHandler}>Sign out</Button>

    )
}
