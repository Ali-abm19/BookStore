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
    const urlSignIn = "https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/Users/signIn"

    function userSignIn() {

        axios.post(urlSignIn,
            {
                "email": Email,
                "password": Password
            }
        )
            .then((response) => {
                //console.log(response);
                enqueueSnackbar("Welcome " + response.data.dto.name, { variant: 'success', autoHideDuration: 3000 });
                setToken(response.data.token);
                localStorage.setItem("UserInfo", JSON.stringify(response.data));
                setUser(response.data.dto);
                // //console.log(user);
                navigate('/home');
            })
            .catch((e) => {
                setError(e);
                //console.log(e);
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
            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={userSignIn}>Sign In</Button>

            <p>Or if you don't have an account:</p>
            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => { navigate('/signUp') }} >Sign-Up</Button>
        </div>
    )
}
