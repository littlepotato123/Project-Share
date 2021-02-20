import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserList from './UserList';

const GET_SUPPORTING = gql`
    query UserHandle($handle: String!) {
        user: user_handle(handle: $handle) {
            supporting
        }
    }
`;

const Supporting = () => {
    const { handle } = useParams();

    const { loading, error, data } = useQuery(GET_SUPPORTING, {
        variables: {
            handle
        }
    });

    if(loading) return <p>Loading...</p>

    if(error) {
        window.location.reload();
    }

    return (
        <div>
            {
                data.user.supporting.map(l => <UserList id={l} />)
            }
        </div>
    )
}

export default Supporting;