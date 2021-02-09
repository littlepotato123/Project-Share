import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { handleKeys } from '../../Tools';

const ADD_REQUEST = gql`
    mutation add_request ($input: AddRequestInput!) {
        add_request(
            input: $input
        ) {
            id
            name
            description
        }
    }
`;

const Input = () => {
    const [addRequest] = useMutation(ADD_REQUEST);

    const [description, setDescription] = useState('');
    const [key, setKey] = useState('');

    const submit = () => {
        if(description) {
            addRequest({ variables: { input: {
                name: sessionStorage.getItem('handle') ? sessionStorage.getItem('handle') : "Guest",
                description
            } } })
                .then(() => {
                    window.location.reload();
                })
        }
    }

    return (
        <div>
            <input className="inputArea" value="" maxlength="100" value={description} onKeyDown={e => handleKeys(e, key, setKey, submit)} onChange={e => setDescription(e.target.value)}></input>
            <button onClick={submit}>Submit Request</button>
        </div>
    )
}

export default Input;