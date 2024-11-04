import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import ProfilePage from '../../pages/ProfilePage';
import axios from 'axios';


export default function ProtectedRoute({ user, setUser, token, element }) {
    const navigate = useNavigate();

    // function authUser() {
    //     axios.get(
    //         "http://localhost:5125/api/v1/users/authenticateUser", {
    //     }, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     }
    //     )
    //         .then((response) => console.log(response.data))
    //         // setUser(response.data)
    //         .catch((error) => console.log(error));
    // }

    // useEffect(() => {
    //     authUser();
    // }, []);

    //console.log(user);

    if (user.email !== undefined) {
        return (
            element
        )
    }
    else { navigate('/signIn') }

}
