import React, { useState } from 'react';
import { storage } from '../../Firebase/index';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const aUrl = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const SignUp = (props) => {
    const [handle, setHandle] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [bio, setBio] = useState('');

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
            storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    setUrl(url);
                });
            }
        );
    };

    const submit = () => {
        const data = {
            email,
            password: pass,
            confirmPassword: confirm,
            userHandle: handle,
            url,
            bio
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
                    window.location.reload(false);
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
            <textarea onChange={e => setBio(e.target.value)} placeholder="Biography" >
            
            </textarea> 
            <div>
                <progress value={progress} max="100" />
                <br />
                <br />
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload}>Upload</button>
                <br />
            </div>
            <button onClick={submit}>Sign Up</button>
            {errors}
        </div>
    )
}

export default SignUp;