import React, { useEffect, useState } from 'react'

import SignIn from '../components/Shared/SignIn';
import Register from '../components/Shared/Register';


export default function Account({ isRegistered, token, setToken, user, setUser }) {

    if (isRegistered)
        return (
            <div>
                <SignIn
                    token={token}
                    setToken={setToken}
                    user={user}
                    setUser={setUser} ></SignIn>
            </div>
        )

    else {
        return (
            <div>
                <Register
                    token={token}
                    setToken={setToken}
                    user={user}
                    setUser={setUser}></Register>
            </div>
        )
    }
}
