import React, { useEffect, useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    const [auth, setAuth] = useState(true);

    let authVar = (
        <SignUp />
    )

    if(auth) {
        authVar = (
            <SignUp />
        )
    } else {
        authVar = (
            <Login />
        )
    }

    useEffect(() => {

    })
    
    return (
        <div>
            {authVar}
        <button onClick={() => setAuth(!auth)}>{}</button>
        </div>
    )
}

export default Auth;