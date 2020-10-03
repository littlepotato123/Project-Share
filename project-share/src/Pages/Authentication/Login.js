import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIdToken } from '../../Reducers/setIdToken';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Login = () => {
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const idToken = useSelector(state => state.idToken)

    const submit = () => {
        fetch(proxyUrl + url + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: pass
            })
        })
            .then(res => res.json())
            .then(data => {
                if(data.idToken) {
                    dispatch(setIdToken(data.idToken))
                } else if(data.general) {
                    setError(data.general);
                }
            })
    }

    const getId = () => {
        console.log(idToken);
    }

    return (
        <div>
            <input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input value={pass} placeholder="Password" onChange={e => setPass(e.target.value)} />
            <button onClick={submit}>Login</button>
            {error}
            <button onClick={getId}>Get Id Token</button>
        </div>
    )
}

export default Login;