import axios from 'axios'
import React, { useState } from 'react'
import UpdateUserProfile from '../Forms/UpdateUserProfile';
import { Button } from '@mui/material';

export default function ProfileInfo({ user, setUser }) {

    const [userInfoUpdate, setUserInfoUpdate] = useState(
        {
            name: user.name,
            address: user.address,
            phone: user.phone,
            password: ""
        }
    );

    function updateUserProfile() {
        const token = localStorage.getItem("token");
        console.log(userInfoUpdate)
        axios
            .put(
                `http://localhost:5125/api/v1/users/${user.userId}`, userInfoUpdate
                ,
                { headers: { Authorization: `Bearer ${token}` }, }


            )
            .then((res) => {
                // BE: return user with new info
                console.log(res);
                setUser(res.data);
                // setAnchorEl(null);

            })
            .catch((error) => console.log(error));
    }
    return (
        <div>
            <p>Email: {user.email}</p>
            <p>Id: {user.userId}</p>
            <p>Name: {user.name}</p>
            <p>Address: {user.address}</p>

            <UpdateUserProfile
                userInfoUpdate={userInfoUpdate}
                setUserInfoUpdate={setUserInfoUpdate}
            ></UpdateUserProfile>
            <Button color='F5EDF0' variant="outlined" onClick={updateUserProfile}>Update Account</Button>

        </div>
    )
}
