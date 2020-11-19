import React, { useEffect, useState } from 'react';
import { Fetch } from '../../Tools';
import List from './List';

const Messages = (props) => {
    const [messages, setMessages] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    getMessages(userId: "${props.id}") {
                        id
                        author
                        body
                    }
                } 
            `);
            setMessages(res.getMessages);
        };

        scoped();
    }, [])

    const send = () => {
        const scoped = async () => {
            const token = sessionStorage.getItem('token');
            console.log(props.id);
            console.log(token);
            console.log(message);
            const res = await Fetch(`
                mutation {
                createMessage(token:"${token}", body:"${message}", userId:"${props.id}") {
                    id
                    body
                    author
                    userId
                }
            } 
            `);
            window.location.reload(false);
        }

        if(message) {
            scoped();
        }
    }

    const handleKeys = (e) => {
        if(e.key == "Enter") {
            send();
        }
    }

    return (
        <div>
            { messages ? messages.map(m => <List author={m.author} body={m.body} />) : <p>Loading...</p>}
            <input 
                placeholder="Message to User"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeys}
            />
            <button onClick={send}>Send</button>
        </div>
    )
}

export default Messages;