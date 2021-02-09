import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import {
    useHistory
} from 'react-router-dom';
import { add_token, handleKeys } from '../../Tools';

const LOGIN = gql`
    mutation login ($input: LoginInput!) {
        login (input: $input)
}
`;

const Login = () => {
    const [login] = useMutation(LOGIN);
    const [handle, setHandle] = useState('');
    const [pass, setPass] = useState('');
    const [key, setKey] = useState('')

    const history = useHistory();

    const submit = () => {
        if(handle && pass) {
            login({ variables: {
                input: {
                    handle: handle,
                    password: pass
                }
            } })
                .then(res => {
                    add_token(res.data.login)
                    window.location.reload();
                })
                .catch(e => console.log(e))
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <input value={handle} placeholder="handle" onChange={e => setHandle(e.target.value)} />
            <input type="password" onKeyDown={(e) => handleKeys(e, key, setKey, submit)} value={pass} placeholder="Password" onChange={e => setPass(e.target.value)} />
            <button onClick={submit}>Login</button>
        </div>
    )
}

export default Login;