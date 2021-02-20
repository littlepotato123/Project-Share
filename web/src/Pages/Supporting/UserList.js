import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_HANDLE = gql`
    query UserToken($token: String!) {
        user: user_token(token: $token) {
            handle
        }
    }
`;

const UserList = (props) => {
    const { loading, error, data } = useQuery(GET_HANDLE);

    if(loading) return <p>Loading...</p>

    if(error) window.location.reload();

    return (
        <div>
            {
                data.user.handle
            }
        </div>
    )
}

export default UserList;