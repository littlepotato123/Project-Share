import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    return (
        <div className="auth-out">
            <div className="signup">
                <SignUp />
            </div>
            <div className="vl"></div>
            <div className="login">
                <Login />
            </div>
        </div>
    )
}

export default Auth;