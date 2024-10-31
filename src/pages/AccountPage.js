import React, { useState } from 'react'
import axios from 'axios';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import RegisterForm from '../components/Forms/RegisterForm'
import SignInForm from '../components/Forms/SignInForm';


export default function Account({ isRegistered, setIsRegistered, token, setToken }) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    let urlSignup = "http://localhost:5125/api/v1/Users/signUp"

    function registerNewUser() {
        axios.post(urlSignup,
            {
                "email": Email.toString(),
                "password": Password.toString()
            }
        )
            .then((response) => {
                console.log(response);
                enqueueSnackbar("Account Created", { variant: 'success', autoHideDuration: 3000 });
                navigate('/home');
            })
            .catch((e) => {
                setError(e);
                console.log(e);
                if (error.status === 400) {
                    enqueueSnackbar(error.response.data.errors.Email[0], { variant: 'error', autoHideDuration: 7000 });
                    enqueueSnackbar(error.response.data.errors.Password[0], { variant: 'error', autoHideDuration: 7000 });
                }
            });
    }

    if (isRegistered) {//return login page
        return (
            <div>
                <SignInForm
                    setEmail={setEmail}
                    setPassword={setPassword} />
            </div>
        )
    }
    else //return register page
        return (
            <div>
                <RegisterForm
                    setEmail={setEmail}
                    setPassword={setPassword} />
                <Button onClick={registerNewUser} >Register</Button>
                <Button onClick={() => setIsRegistered(true)} >or Sign-In</Button>
            </div>
        )
}
