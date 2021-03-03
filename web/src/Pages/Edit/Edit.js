import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import Selection from '../../Components/Layout/Selection';
import { handleKeys } from '../../Tools';

const NEW_BIO_LAYOUT = gql`
    mutation new($id: Int!, $bio: String!, $layout: Int!) {
        new_bio(
            input: {
                id: $id
                bio: $bio
            }
        )
        new_layout(
            input: {
                id: $id
                layout: $layout
            }
        )
    }
`;

const NEW_PASSWORD = gql`
    mutation new_password($input: NewPasswordInput!) {
        new_password(input: $input)
    }
`;

const Edit = () => {
    const [setBioLayout] = useMutation(NEW_BIO_LAYOUT);
    const [newPassword] = useMutation(NEW_PASSWORD);
    const [bio, setBio] = useState(sessionStorage.getItem('bio'));
    const [state, setState] = useState('');
    const [pass, setPass] = useState('');

    const submit = () => {
        setBioLayout({
            variables: {
                id: sessionStorage.getItem('id'),
                bio,
                layout: sessionStorage.getItem('curr_layout')
            }
        })
        .then(() => {
            window.alert('Successfully Editted');
        })
        .catch(e => console.log(e));
    }

    const password = () => {
        newPassword({
            variables: {
                input: {
                    token: sessionStorage.getItem('token'),
                    password: pass
                }
            }
        })
            .then(({ data }) => {
                sessionStorage.setItem('token', data.new_password);
            })
            .catch(e => console.log(e));
    }

    return (
        <div>
            <textarea
                value={bio}
                onChange={e => {
                    setBio(e.target.value);
                    sessionStorage.setItem('bio', e.target.value);
                }}
                onKeyDown={(e) => handleKeys(e, state, setState, submit)}
            >
            </textarea>
            <Selection />
            <button onClick={submit}>Update</button>
            <input placeholder="New Password" type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => {
                if(e.key == "Enter") {
                    password();
                }
            }} />
            <button onClick={password}>New Password</button>
        </div>
    )
}

export default Edit;