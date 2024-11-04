import { TextField } from '@mui/material'
import React from 'react'

export default function UpdateUserProfile({ userInfoUpdate, setUserInfoUpdate }) {
    function changeHandler(event) {
        //[event.target.name]: event.target.value,
        const { name, value } = event.target;
        setUserInfoUpdate({ ...userInfoUpdate, [name]: value })

        console.log(userInfoUpdate);
    }


    return (
        <div>
            <TextField
                name="password"
                label="password"
                variant="outlined"
                helperText="enter the new password"
                type='password'
                onChange={changeHandler}
            />
            <TextField
                name="name"
                label="name"
                variant="outlined"
                helperText="enter the new name"
                onChange={changeHandler}
            />
            <TextField
                name="address"
                label="address"
                variant="outlined"
                helperText="enter the new address"
                onChange={changeHandler}
            />
            <TextField
                name="phone"
                label="phone"
                variant="outlined"
                helperText="enter the new phone number"
                type='tel'
                onChange={changeHandler}
            />
        </div>
    )
}
