import { gql, useMutation } from '@apollo/client';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { storage } from "../../Firebase/index";
import { handleKeys, set_liked, set_supported } from "../../Tools";

const SIGNUP = gql`
  mutation signup($input: SignupInput!) {
    signup (input: $input) {
      id
      handle
      password
      liked
      supported
      supporting
      layout
      bio
    }
  }
`;

const SignUp = () => {
  const [signup] = useMutation(SIGNUP);

  const [handle, setHandle] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [bio, setBio] = useState("");
  const [key, setKey] = useState('');

  const history = useHistory();

  const handleUpload = () => {
    if(image.name.endsWith('.png') || image.name.endsWith('.jpg')) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
            });
        }
      );
    } else {
      alert('Must be PNG file or JPG file')
    }
  };

  const submit = () => {
    if(
      pass &&
      bio &&
      handle && 
      pass && confirm
    ) {
      if(url) {
        signup({ variables: {
          input: {
            handle: handle,
            password: pass,
            bio: bio,
            imageUrl: url
          }
        } })
          .then(({ data }) => {
            console.log(data);
            sessionStorage.setItem('token', data.signup.password);
            sessionStorage.setItem('handle', data.signup.handle);
            set_liked(data.signup.liked)
            set_supported(data.signup.supported);
            sessionStorage.setItem('layout', data.signup.layout);
            sessionStorage.setItem('bio', data.signup.bio);
            // window.location.reload();
          })
      } else {
        window.confirm('Are you sure you want to continue without profile picture')
        signup({ variables: {
          input: {
            handle: handle,
            password: pass,
            bio: bio,
            imageUrl: ""
          }
        } })
          .then(({ data }) => {
            console.log(data);
            sessionStorage.setItem('token', data.signup.password);
            sessionStorage.setItem('handle', data.signup.handle);
            set_liked(data.signup.liked)
            set_supported(data.signup.supported);
            sessionStorage.setItem('layout', data.signup.layout);
            sessionStorage.setItem('bio', data.signup.bio);
            // window.location.reload();
          })
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        value={handle}
        placeholder="User Handle"
        onChange={(e) => setHandle(e.target.value)}
      />
      <input
        value={pass}
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
        type="password"
      />
      <input
        value={confirm}
        placeholder="Confirm Password"
        onChange={(e) => setConfirm(e.target.value)}
        type="password"
      />
      <textarea
        onChange={(e) => setBio(e.target.value)}
        onKeyDown={e => handleKeys(e, key, setKey, submit)}
        placeholder="Biography"
        maxLength={200}
      ></textarea>
      <div>
        <progress value={progress} max="100" />
        <br />
        <input type="file" onChange={(e) => {
          if(e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }} />
        <button onClick={handleUpload}>Upload</button>
        <br />
      </div>
      <button onClick={submit}>Sign Up</button>
    </div>
  );
};

export default SignUp;
