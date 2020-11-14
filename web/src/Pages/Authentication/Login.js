import React, { useState } from 'react';

const Login = (props) => {
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const [error, setError] = useState(null);

    const submit = () => {

    }

    return (
        <div>
            <input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" value={pass} placeholder="Password" onChange={e => setPass(e.target.value)} />
            <button onClick={submit}>Login</button>
            {error}
        </div>
    )
}

export default Login;