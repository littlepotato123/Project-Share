import React, { useEffect, useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    const [auth, setAuth] = useState(true);

    let authVar = (
        <SignUp />
    )
    let authString = 'Login';

    if(auth) {
        authVar = (
            <SignUp />
        )
        authString = 'Login';
    } else {
        authVar = (
            <Login />
        )
        authString = 'SignUp';
    }

    useEffect(() => {

    })
    
    return (
        <div>
            {authVar}
            <button onClick={() => setAuth(!auth)}>{authString}</button>
        </div>
    )
}

export default Auth;