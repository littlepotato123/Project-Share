import React from 'react';
import { View } from 'react-native';
import Login from './Login';
import Signup from './Signup';

interface Props {
    setToken: React.Dispatch<React.SetStateAction<string>>
}

const Auth: React.FC<Props> = ({ setToken }) => {
    return (
        <View>
            <Login setToken={setToken} />
            <Signup setToken={setToken} />
        </View>
    );
}

export default Auth;