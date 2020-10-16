import React, { useState } from 'react'
import { storage } from '../../Firebase/index';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const aUrl = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const SignUp = (props) => {
    const [handle, setHandle] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState('');

    const submit = () => {
        const data = {
            email,
            password: pass,
            confirmPassword: confirm,
            userHandle: handle,
        };
        fetch(proxyUrl + aUrl + 'signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(data.idToken) {
                    sessionStorage.setItem('token', data.idToken);
                }
                // handle
                else if(data.handle) {
                    setErrors(data.handle);
                }
                // error
                else if(data.error) {
                    setErrors(data.error);
                }
                // confirmPassword
                else if(data.confirmPassword) {
                    setErrors(data.confirmPassword);
                }
            })
    }

    return (
        <div>
            <input value={handle} placeholder="User Handle" onChange={e => setHandle(e.target.value)} />
            <input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input value={pass} placeholder="Password" onChange={e => setPass(e.target.value)} type="password" />
            <input value={confirm} placeholder="Confirm Password" onChange={e => setConfirm(e.target.value)} type="password" />
            <button onClick={submit}>Sign Up</button>
            {errors}
        </div>
    )
}

export default SignUp;