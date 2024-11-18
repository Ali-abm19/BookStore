import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import RegisterForm from '../Forms/RegisterForm';

export default function Register({ isRegistered, token, setToken, user, setUser }) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [isLoadingSignUp, setIsLoadingSignUp] = useState(true);
    const navigate = useNavigate();

    let urlSignup = "http://localhost:5125/api/v1/Users/signUp"

    function registerNewUser() {
        setIsLoadingSignUp(true);
        axios.post(urlSignup,
            {
                "name": Name,
                "address": Address,
                "phone": Phone,
                "email": Email.toString(),
                "password": Password.toString()
            }
        )
            .then((response) => {
                setIsLoadingSignUp(false);
                ////console.log(response);
                enqueueSnackbar("Account Created", { variant: 'success', autoHideDuration: 3000 });
                navigate('/home');
            })
            .catch((e) => {
                setIsLoadingSignUp(false)
                setError(e);
                if (error.status === 400) {
                    try{
                    enqueueSnackbar(e.response.data.errors.Email[0], { variant: 'error', autoHideDuration: 5000 });
                    enqueueSnackbar(e.response.data.errors.Password[0], { variant: 'error', autoHideDuration: 5000 });
                }
                catch(er){
                        enqueueSnackbar(e, { variant: 'error', autoHideDuration: 5000 });

                }
            }
            });
    }

    useEffect(() => {
        registerNewUser();
    }, []);

    if (isLoadingSignUp) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            flexDirection:'column'
        }}>
            <RegisterForm
                setEmail={setEmail}
                setPassword={setPassword}
                setAddress={setAddress}
                setPhone={setPhone}
                setName={setName}
            />
            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={registerNewUser} >Register</Button>

            <p>If you already have an account:</p>
            <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={() => { navigate('/signIn') }} >Sign-in</Button>
        </div>
    )
}

