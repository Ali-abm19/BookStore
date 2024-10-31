import { TextField } from '@mui/material';
import React from 'react'

export default function SignInForm({ setEmail, setPassword }) {
    function onChangeHandlerEmail(event) {
        setEmail(event.target.value);
        console.log("email:" + event.target.value);
    }
    function onChangeHandlerPassword(event) {
        setPassword(event.target.value);
        console.log("password:" + event.target.value);
    }
    return (
        <div>
            <h1>Sign-In</h1>
            <TextField
                id="email"
                label="Email"
                variant="standard"
                helperText="enter your email"
                onChange={onChangeHandlerEmail}
            />

            <TextField
                id="password"
                label="Password"
                variant="standard"
                helperText="enter your password"
                type='password'
                onChange={onChangeHandlerPassword}
            />

        </div>
    )
}
