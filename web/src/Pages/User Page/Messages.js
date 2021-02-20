import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { handleKeys } from '../../Tools';

const ALL_MESSAGES = gql`
    query AllMessages($id: Int!) {
        messages: all_messages(id: $id)
    }
`;

const NEW_MESSAGE = gql`
    mutation CreateMessage($input: AddMessageInput!) {
        add_message(input: $input)
    }
`;

const Messages = (props) => {
    const { loading, error, data } = useQuery(ALL_MESSAGES, {
        variables: {
            id: props.id
        }
    })

    const [Add] = useMutation(NEW_MESSAGE);

    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');

    if(loading) return <p>Loading...</p>

    if(error) window.location.reload();

    const send = () => {
        Add({
            variables: {
                input: {
                    userId: props.id,
                    body: message
                }
            }
        })
            .then(({ data }) => {
                window.alert('Message')
            })
            .catch(e => console.log(e))
    }

    return (
        <div>
            {
                data.messages.map(str => <p>{str}</p>)
            }
            <a href={`/messages/${props.id}`}>All Messages</a>
            <input 
                placeholder="Message to User"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => handleKeys(e, key, setKey, send)}
            />
            <button onClick={send}>Send</button>
        </div>
    )
}

export default Messages;