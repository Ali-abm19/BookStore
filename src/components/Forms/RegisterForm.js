import { TextField } from '@mui/material'
import React from 'react'

export default function RegisterForm({
    setEmail,
    setPassword,
    setAddress,
    setPhone,
    setName }) {
    function onChangeHandlerEmail(event) {
        setEmail(event.target.value);
    }
    function onChangeHandlerPassword(event) {
        setPassword(event.target.value);
    }
    function onChangeHandlerName(event) {
        setName(event.target.value);
    }
    function onChangeHandlerAddress(event) {
        setAddress(event.target.value);
    }
    function onChangeHandlerPhone(event) {
        setPhone(event.target.value);
    }
    return (
        <div style={{
            width: '600px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column'
        }}>
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
            <br></br>
            <div>
                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    helperText="enter your full name"
                    type='text'
                    onChange={onChangeHandlerName}
                />

                <TextField
                    id="Phone"
                    label="Phone"
                    variant="outlined"
                    helperText="example: 966501234567, 0501234567"
                    type='tel'
                    onChange={onChangeHandlerPhone}
                />
            </div>
            <br></br>
            <TextField
                id="Address"
                label="Address"
                variant="outlined"
                helperText="enter your address"
                type='text'
                multiline
                rows={3}
                maxRows={3}
                fullWidth
                onChange={onChangeHandlerAddress}
            />

        </div>


    )
}
