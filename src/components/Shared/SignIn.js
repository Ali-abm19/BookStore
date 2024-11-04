import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import SignInForm from '../Forms/SignInForm';

export default function SignIn({ token, setToken, user, setUser }) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");
    // const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
    const navigate = useNavigate();
    const urlSignIn = "http://localhost:5125/api/v1/Users/signIn"

    function userSignIn() {

        axios.post(urlSignIn,
            {
                "email": Email,
                "password": Password
            }
        )
            .then((response) => {
                console.log(response);
                enqueueSnackbar("Welcome " + response.data.dto.name, { variant: 'success', autoHideDuration: 3000 });
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setUser(response.data.dto);
                // console.log(user);
                navigate('/home');
            })
            .catch((e) => {
                setError(e);
                console.log(e);
                if (error.status === 404) {
                    enqueueSnackbar(error.response.data.message, { variant: 'error', autoHideDuration: 5000 });
                }
                if (error.status === 401) {
                    enqueueSnackbar(error.response.data.message, { variant: 'error', autoHideDuration: 5000 });
                }
                if (error.status === 400) {
                    if (error.response.data.errors.Email[0])
                        enqueueSnackbar(error.response.data.errors.Email[0], { variant: 'error', autoHideDuration: 5000 });
                    if (error.response.data.errors.Password[0])
                        enqueueSnackbar(error.response.data.errors.Password[0], { variant: 'error', autoHideDuration: 5000 });
                }
            });

    }
    return (
        <div>
            <SignInForm
                setEmail={setEmail}
                setPassword={setPassword} />
            <Button color='F5EDF0' variant="outlined" onClick={userSignIn}>Sign In</Button>
            <Button color='F5EDF0' variant="outlined" onClick={() => { navigate('/signUp') }} >or Sign-Up</Button>
        </div>
    )
}
