import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import UserList from '../components/UserList';
import { L_User } from '../Tools';

const LEADERBOARD = gql`
    query {
        leaderboard {
            id
            handle
            bio
            points
            supporters
        }
    }
`;

const Leaderboard: React.FC = () => {
    const { data } = useQuery(LEADERBOARD);

    if(data) {
        return (
            <View>
                {
                    data.leaderboard.map((user: L_User) => <UserList user={user} />)
                }
            </View>
        );
    } else {
        return <Text>Loading...</Text>
    }
}

export default Leaderboard;