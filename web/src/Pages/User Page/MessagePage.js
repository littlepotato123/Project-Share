import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';

const GET_MESSAGES = gql`
    query AllMessages($id: Int!) {
        messages: all_messages(id: $id) 
    }
`;

const MessagePage = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_MESSAGES, {
        variables: {
            id
        }
    });

    if(loading) return <p>Loading...</p>

    if(error) window.location.reload();

    return (
        <div>
            {
                data.messages.map(s => <div><p>{s}</p></div>)
            }
        </div>
    )
}

export default MessagePage;