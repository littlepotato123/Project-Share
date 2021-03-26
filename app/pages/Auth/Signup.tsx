import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

const Signup: React.FC<Props> = ({ setToken }) => {
    return (
        <View>
            <Text>Signup</Text>
        </View>
    );
}

export default Signup;