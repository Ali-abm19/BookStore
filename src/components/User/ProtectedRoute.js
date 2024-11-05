import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function ProtectedRoute({ user, setUser, token, element, checkAdmin }) {
    const navigate = useNavigate();

    if (user == null) {
        navigate('/signIn');
    }


    if (checkAdmin) {
        if (user.role === "Admin") {
            return (
                element
            )
        }
        else {
            navigate('/signIn');
        }
    }
    else {// user is not null and we don't want to check the for him being admin -> return profile
        return element
    }

}
