import React, { useState } from 'react';
import { storage } from '../../Firebase/index';
import { Fetch } from '../../Tools';

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
        const scoped = async () => {
            const res = await Fetch(`
                mutation {
                    signup(handle: "${handle}", email: "${email}", password: "${pass}", imageUrl: "${url ? url : ""}", bio: "${bio}") {
                        password
                    }
                }
            `)

            console.log(res);
            if(res.signup !== undefined && res.signup !== null) {
                console.log()
                sessionStorage.setItem('token', res.signup.password);
            } else {
                alert('Something went wrong. Please try again');
            }
        }

        if(email && pass && handle && bio && email.includes('@') && confirm == pass) {
            scoped();
        } else {
            alert('Something went wrong');
        }
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