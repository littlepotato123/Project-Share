import React, { useState } from 'react'

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const SignUp = (props) => {
    const [handle, setHandle] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState('');

    const submit = () => {
        fetch(proxyUrl + url + 'signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: pass,
                confirmPassword: confirm,
                userHandle: handle
            })
        })
            .then(res => res.json())
            .then(data => {
                if(data.idToken) {
                    props.setToken(data.idToken);
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
            <input value={pass} placeholder="Password" onChange={e => setPass(e.target.value)} />
            <input value={confirm} placeholder="Confirm Password" onChange={e => setConfirm(e.target.value)} />
            <button onClick={submit}>Sign Up</button>
            {errors}
        </div>
    )
}

export default SignUp;