import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserList from './UserList';

const GET_SUPPORTED = gql`
    query UserHandle($handle: String!) {
        user: user_handle(handle: $handle) {
            supported
        }
    }
`;

const Supported = () => {
    const { handle } = useParams();

    const { loading, error, data } = useQuery(GET_SUPPORTED, {
        variables: {
            handle
        }
    });

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        window.location.reload();
    }

    return (
        <div>
            {
                data.user.supported.map(l => <UserList id={l} />)
            }
        </div>
    )
}

export default Supported;