import React, { useState } from 'react';
import {
    useHistory
} from 'react-router-dom';
import { Fetch } from '../../Tools';

const Login = (props) => {
    const [handle, setHandle] = useState(null);
    const [pass, setPass] = useState(null);

    const history = useHistory();

    const submit = () => {
        const scoped = async () => {
            const res = await Fetch(`
                    mutation {
                        login(handle:"${handle}", password:"${pass}")
                    }
            `);
            if(res.login) {
                sessionStorage.setItem('token', res.login);
                history.push('/home');
            } else {
                alert('Something went wrong while trying to login. Please try again!');
            }
        }

        scoped();
    }

    const handleKeys = (e) => {
        if(e.key == "Enter") {
            console.log('Enter');
        }
    }

    return (
        <div>
            <input value={handle} placeholder="handle" onChange={e => setHandle(e.target.value)} />
            <input type="password" onKeyDown={handleKeys} value={pass} placeholder="Password" onChange={e => setPass(e.target.value)} />
            <button onClick={submit}>Login</button>
        </div>
    )
}

export default Login;