import React, { useEffect, useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    const [auth, setAuth] = useState(true);
    
    let authString = 'Login';
    let authComp = (
        <SignUp />
    )

    if(auth) {
        authComp = (
            <SignUp />
        )
        authString = 'Login';
    } else {
        authComp = (
            <Login />
        )
        authString = 'SignUp';
    }

    return (
        <div>
            { authComp }
            <button onClick={() => setAuth(!auth)}>{authString}</button>
        </div>
    )
}

export default Auth;