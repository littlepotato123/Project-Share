import React, { useState } from 'react';
import { Fetch } from '../../Tools';

const Login = (props) => {
    const [handle, setHandle] = useState(null);
    const [pass, setPass] = useState(null);

    const submit = () => {
        const scoped = async () => {
            const res = await Fetch(`
                    mutation {
                        login(handle:"${handle}", password:"${pass}")
                    }
            `);
            if(res.login) {
                sessionStorage.setItem('token', res.login);
            }
        }

        scoped();
    }

    return (
        <div>
            <input value={handle} placeholder="handle" onChange={e => setHandle(e.target.value)} />
            <input type="password" value={pass} placeholder="Password" onChange={e => setPass(e.target.value)} />
            <button onClick={submit}>Login</button>
        </div>
    )
}

export default Login;