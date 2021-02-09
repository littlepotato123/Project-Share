import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import Selection from '../../Components/Layout/Selection';
import { Fetch, handleKeys } from '../../Tools';

const NEW_BIO_LAYOUT = gql`
    mutation new($id: Int!, $bio: String!, $layout: Int!) {
        new_bio(
            input: {
                id: $id
                bio: $id
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

const Edit = () => {
    const [setBioLayout] = useMutation(NEW_BIO_LAYOUT);
    const [bio, setBio] = useState(sessionStorage.getItem('bio'));
    const [state, setState] = useState('');
    const [pass, setPass] = useState('');

    const submit = () => {
        setBioLayout
    }

    const password = () => {
        const scoped = async () => {
            const res = await Fetch(`
                mutation {
                    new_password(
                        input: {

                        }
                    )
                }
            `);
            sessionStorage.setItem('token', res.new_password);
        };
        scoped();
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