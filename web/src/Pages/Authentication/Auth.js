import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { get_token } from '../../Tools';
import Login from './Login';
import SignUp from './SignUp';

const Auth = () => {
    const history = useHistory()

    useEffect(() => {
        if(get_token() !== null | undefined) {
            history.push('/home');
        }
    }, [])

    return (
        <div>
            <div>
                <SignUp />
            </div>
            <div>
                <Login />
            </div>
        </div>
    )
}

export default Auth;