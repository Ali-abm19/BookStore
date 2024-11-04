import { Button } from '@mui/material'
import { enqueueSnackbar } from 'notistack';
import React from 'react'

export default function Logout({user, setUser}) {

    function signOutHandler() {
            setUser(null);
            localStorage.setItem("token", "");
        enqueueSnackbar('You successfully signed out!', {variant:'success'});
    }
    return (
        <Button color='F5EDF0' variant="outlined" onClick={signOutHandler}>Sign out</Button>

    )
}
