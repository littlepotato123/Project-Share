import React, { useState } from 'react';
import { Fetch } from '../../Tools';

const Input = (props) => {
    const [comment, setComment] = useState('');

    const submit = () => {
        const token = sessionStorage.getItem('token');

        const scoped = async () => {
            const res = await Fetch(`
                    mutation {
                        newComment(token:"${token}", body:"${comment}", id:"${props.id}")
                    }
            `);
            setComment('');
            window.location.reload(false);
        };
        scoped();
    }

    const handleKeys = e => {
        if(e.key == "Enter") {
            submit();
        }
    }

    return (
        <div>
            <input value={comment} onChange={e => setComment(e.target.value)} onKeyDown={handleKeys} placeholder="Comment..." />
            <button onClick={submit}>Comment</button>
        </div>
    )
}

export default Input;