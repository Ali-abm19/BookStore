import axios from 'axios'
import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import UpdateUserProfile from '../Forms/UpdateUserProfile';
import { enqueueSnackbar } from 'notistack';

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
                enqueueSnackbar("your account was updated", { variant: 'success', autoHideDuration: 5000 });
                // setAnchorEl(null);

            })
            .catch((error) => {
                if (error.status === 400) {
                    if (error.response.data.errors.Password[0])
                        enqueueSnackbar(error.response.data.errors.Password[0], { variant: 'error', autoHideDuration: 5000 });
                }
            }
            )
    }
    return (
        <div style={{ display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
            <p>Email: {user.email}</p>
            <p>Id: {user.userId}</p>
            <p>Name: {user.name}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>

            <Accordion style={{ maxWidth: "550px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Update Your Information
                </AccordionSummary>
                <AccordionDetails>

                    <UpdateUserProfile
                        userInfoUpdate={userInfoUpdate}
                        setUserInfoUpdate={setUserInfoUpdate}
                    ></UpdateUserProfile>
                    <Button color='F5EDF0' variant="outlined" onClick={updateUserProfile}>Update Account</Button>

                </AccordionDetails>
            </Accordion>
        </div>
    )
}
