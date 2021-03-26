import React from 'react';
import { Text, View } from 'react-native';
import { L_User } from '../Tools';

interface Props {
    user: L_User;
};

const UserList: React.FC<Props> = ({ user: {
    id,
    bio,
    handle,
    points,
    supporters
} }) => {
    return (
        <View key={id}>
            <Text>{bio}</Text>
            <Text>{handle}</Text>
            <Text>{points}</Text>
            <Text>{supporters}</Text>
        </View>
    );
}

export default UserList;