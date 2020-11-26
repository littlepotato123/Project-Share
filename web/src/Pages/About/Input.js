import React, { useState } from 'react';
import { Fetch } from '../../Tools';

const Input = () => {
    const [description, setDescription] = useState('');

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
            if(res.newRequest) {
                window.location.reload(false);
            } else {
                alert("Failed to Request");
            };
        }
        scoped();
    }

    const handleKeys = e => {
        if(e.key == "Enter") {
            submit();
        }
    }

    return (
        <div>
            <textarea value={description} onKeyDown={handleKeys} onChange={e => setDescription(e.target.value)}></textarea>
            <button onClick={submit}>Submit Request</button>
        </div>
    )
}

export default Input;