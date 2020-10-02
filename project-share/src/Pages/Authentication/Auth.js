import React, { useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    const [auth, setAuth] = useState(true);

    let authVar = (
        <SignUp />
    )
    
    return (
        <div>
            {}
        </div>
    )
}

export default Auth;