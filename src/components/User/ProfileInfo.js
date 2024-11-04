import axios from 'axios'
import React from 'react'

export default function ProfileInfo({ user, setUser, newName, newAddress, newPhone, newPassword }) {


    function updateUserProfile() {
        const token = localStorage.getItem("token");
        axios
            .put(
                `http://localhost:5291/api/v1/users/${user.id}`,
                {
                    name: newName | user.name,
                    address: newAddress | user.address,
                    phone: newPhone | user.phone,
                    password: newPassword | null
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                // BE: return user with new info
                setUser(res.data);
                // setAnchorEl(null);
            })
            .catch((error) => console.log(error));
    }
    return (
        <div>
            
        </div>
    )
}
