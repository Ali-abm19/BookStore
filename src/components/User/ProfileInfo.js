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
        const token = JSON.parse(localStorage.getItem('UserInfo')).token
        //console.log(userInfoUpdate)
        axios
            .put(
                `https://sda-3-online-backend-teamwork-7fzj.onrender.com/api/v1/users/${user.userId}`, userInfoUpdate
                ,
                { headers: { Authorization: `Bearer ${token}` }, }


            )
            .then((res) => {
                setUser(res.data);
                enqueueSnackbar("your account was updated", { variant: 'success', autoHideDuration: 5000 });

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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

                <p>Email: <br /> {user.email}</p>
                <p>ID:<br /> {user.userId}</p>
                <p>Name: <br />{user.name}</p>
                <p>Phone: <br />{user.phone}</p>

            </div>
            <p>Address: <br />{user.address}</p>
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
                    <Button style={{ color: "4A7D9A" }} variant="outlined" onClick={updateUserProfile}>Update Account</Button>

                </AccordionDetails>
            </Accordion>
        </div>
    )
}
