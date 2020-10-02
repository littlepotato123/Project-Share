import React, { useEffect, useState } from 'react'

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const SignUp = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [userHandle, setuserHandle] = useState(null);

    const [idToken, setToken] = useState(null);

    const submit = () => {
        const data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            userHandle: userHandle
        };
        fetch(proxyUrl + url + 'signup', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(data => {
                
            })
            .catch(() => console.log("Couldn't SignUp"))
    }

    return (
        <div>
            <input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <input value={confirmPassword} placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} />
            <input value={userHandle} placeholder="User Handle" onChange={e => setuserHandle(e.target.value)} />
            <button onClick={submit}>Sign Up</button>
        </div>
    )
}

export default SignUp;