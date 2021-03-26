import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    setToken: React.Dispatch<React.SetStateAction<string>>
}

const Login: React.FC<Props> = ({ setToken }) => {
    return (
        <View>
            <Text>Login</Text>
        </View>
    );
}

export default Login;