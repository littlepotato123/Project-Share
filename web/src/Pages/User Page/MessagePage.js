import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fetch } from '../../Tools';
import List from './List';

const MessagePage = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    all_messages(id: "${id}")
                }
            `);
            if(res) {
                setMessages(res.allMessages);
            }
        }

        scoped();
    }, [])

    return (
        <div>
            { messages ? messages.map(m => <List author={m.author} body={m.body} />) : <p>Loading...</p>}
        </div>
    )
}

export default MessagePage;