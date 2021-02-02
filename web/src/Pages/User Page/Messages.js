import React, { useEffect, useState } from 'react';
import { Fetch, handleKeys } from '../../Tools';
import List from './List';

const Messages = (props) => {
    const [messages, setMessages] = useState(null);
    const [message, setMessage] = useState('');
    const [loadMore, setLoadMore] = useState(null);
    const [key, setKey] = useState('');

    useEffect(() => {
        const scoped = async () => {
            console.log(props.id);
            const res = await Fetch(`
                {
                    all_messages(id: "${props.id}")
                } 
            `);
            console.log(res.getMessages)
            if(res.getMessages) {
                setMessages(res.getMessages);
                setLoadMore(<a href={`/messages/${props.id}`}>Get All Messages</a>)
            } else {
                setMessages([]);
            }
        };

        scoped();
    }, [])

    const send = () => {
        const scoped = async () => {
            const token = sessionStorage.getItem('token');
            if(token == props.id) {
                alert('Cannot Message Yourself');
            } else {
                const res = await Fetch(`
                    mutation {
                        add_message(
                            input: {
                                userId: ${props.id},
                                body: "${message}
                            }
                        )
                    } 
                `);
                window.location.reload(false);
            }
        }

        if(message) {
            scoped();
        }
    }

    return (
        <div>
            { messages ? messages.map(m => <List author={m.author} body={m.body} />) : <p>Loading...</p>}
            {
                loadMore
            }
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