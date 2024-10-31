import { TextField } from '@mui/material'
import React, { useState } from 'react'

export default function RegisterForm({ setEmail, setPassword }) {
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
            <h1>Register</h1>
            <TextField
                id="email"
                label="Email"
                variant="outlined"
                helperText="enter your email"
                onChange={onChangeHandlerEmail}
            />

            <TextField
                id="password"
                label="Password"
                variant="outlined"
                helperText="enter your password"
                type='password'
                onChange={onChangeHandlerPassword}
            />
            
        </div>


    )
}
