import React, { useState } from 'react';
import { Fetch, handleKeys } from '../../Tools';

const Input = () => {
    const [description, setDescription] = useState('');
    const [key, setKey] = useState('');

    const submit = () => {
        const scoped = async () => {
            const name = sessionStorage.getItem('handle') ? sessionStorage.getItem('handle') : "Guest";
            const res = await Fetch(`
                mutation {
                    newRequest(name:"${name}", description:"${description}"){
                        id
                        name
                        description
                    }
                }
            `);
            if (res) {
                if (res.newRequest) {
                    window.location.reload(false);
                } else {
                    alert("Failed to Request");
                };
            } else {
                alert('Failed to Request');
            }
        }
        scoped();
    }

    return (
        <div>
            <input className="inputArea" value="" maxlength="100" value={description} onKeyDown={e => handleKeys(e, key, setKey, submit)} onChange={e => setDescription(e.target.value)}></input>
            <button onClick={submit}>Submit Request</button>
        </div>
    )
}

export default Input;