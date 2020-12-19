import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { storage } from "../../Firebase/index";
import { add_token, Fetch, handleKeys } from "../../Tools";

const SignUp = () => {
  const [handle, setHandle] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [bio, setBio] = useState("");
  const [key, setKey] = useState('');

  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

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
    const scoped = async () => {
      if (url !== "") {
        const res = await Fetch(`
          mutation {
            signup(handle: "${handle}", password: "${pass}", imageUrl: "${url}", bio: "${bio}") {
              password
            }
          } 
        `);
        if (res !== undefined | null) {
          add_token(res.signup.password);
          history.push("/home");
        } else {
          alert("Something went wrong. Please try again");
        }
      } else {
        const bool = window.confirm(
          "Are you sure you don' want a profile picture"
        );
        if (bool == true) {
          const res = await Fetch(`
            mutation {
                signup(handle: "${handle}", password: "${pass}", bio: "${bio}") {
                    password
                }
            }
          `);
          console.log(res);
          if (res.signup !== undefined && res.signup !== null) {
            sessionStorage.setItem("token", res.signup.password);
            window.location.reload(false);
          } else {
            alert("Something went wrong. Please try again");
          }
        } else {
          window.location.reload(false);
        }
      }
    };

    if (
      pass &&
      handle &&
      bio &&
      confirm == pass
    ) {
      scoped();
    } else {
      alert("Something went wrong");
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
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <br />
      </div>
      <button onClick={submit}>Sign Up</button>
    </div>
  );
};

export default SignUp;
