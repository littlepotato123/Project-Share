import React, { useState } from 'react';
import Selection from '../../Components/Layout/Selection';
import { Fetch, handleKeys } from '../../Tools';

const Edit = () => {
    const [bio, setBio] = useState(sessionStorage.getItem('bio'));
    const [state, setState] = useState('');
    const [pass, setPass] = useState('');

    const submit = () => {
        const scoped = async () => {
            const id = parseInt(sessionStorage.getItem('id'));
            const res = await Fetch(`
                mutation {
                    new_bio(
                        input: {
                            id: ${id},
                            bio: "${bio}
                        }
                    )
                    new_layout(
                        input: {
                            id: ${id},
                            layout: ${parseInt(sessionStorage.getItem('curr_layout'))}
                        }
                    )
                }
            `);
            if(res) {
                alert('Successfully updated user');
                sessionStorage.setItem('bio', res.new_bio);
                sessionStorage.setItem('layout', res.new_layout);
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