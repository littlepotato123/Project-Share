import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Loading from '../../Components/Loading/Loading';
import UserList from '../../Components/User List/UserList';

const LEADERBOARD = gql`
    query {
        leaderboard {
            id
            handle
            imageUrl
            bio
            points
            awards
            supporters
            supported
            supporting
            layout
            messages
            liked
        }
    }
`;

const Leaderboard = () => {
    const { loading, error, data } = useQuery(LEADERBOARD);

    if(loading) return <Loading />

    if(error) {
        window.location.reload();
    }

    return (
        <div>
            {
                data.leaderboard.map(user => < UserList name={user.handle} supporters={user.supporters} id={user.userId} />) 
            }
        </div>
    );
};

export default Leaderboard;