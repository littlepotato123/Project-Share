import React, { useState } from 'react';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Login = (props) => {
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const [error, setError] = useState(null);

    const submit = () => {
        fetch(proxyUrl + url + 'login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            body: JSON.stringify({
                email: email,
                password: pass
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.idToken) {
                    sessionStorage.setItem('token', data.idToken)
                } else if (data.general) {
                    setError(data.general);
                }
            })
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