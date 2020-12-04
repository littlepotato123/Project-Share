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
        <div>
            <div>
                <SignUp />
            </div>
            <div></div>
            <div>
                <Login />
            </div>
        </div>
    )
}

export default Auth;