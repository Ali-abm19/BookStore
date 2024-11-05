import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function ProtectedRoute({ user, setUser, token, element }) {
    const navigate = useNavigate();

    if (user == null) {
        navigate('/signIn')
    }
    
    else {
        return (
            element
        )
    }

}
