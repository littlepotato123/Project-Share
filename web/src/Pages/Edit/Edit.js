import React, { useState } from 'react';
import Selection from '../../Components/Layout/Selection';
import { Fetch, handleKeys } from '../../Tools';

const Edit = () => {
    const [bio, setBio] = useState(sessionStorage.getItem('bio'));
    const [state, setState] = useState('');
    const [pass, setPass] = useState('');

    const submit = () => {
        const scoped = async () => {
            const res = await Fetch(`
                mutation {
                    updateUser(
                        token:"${sessionStorage.getItem('token')}",
                        bio:"${bio}",
                        layout:${parseInt(sessionStorage.getItem('curr_layout'))}
                    ) {
                        id
                    }
                }
            `);
            if(res) {
                alert('Successfully updated user');
            } else {
                alert('Try again, there was an error')
            }
        }

        scoped();
    }

    const password = () => {
        const scoped = async () => {
            const res = await Fetch(`
                mutation {
                    newPassword(
                        token:"${sessionStorage.getItem('token')}",
                        new_pass:"${pass}"
                    )
                }
            `);
            console.log(res);
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