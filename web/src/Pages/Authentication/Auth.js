import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    const history = useHistory()

    useEffect(() => {
        if(sessionStorage.getItem('token')) {
            history.push('/home');
        }
    }, [])

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