import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    handle: string | null;
}

const SUPPORTED = gql`
    query user($handle: String!) {
        user: user_handle(handle: $handle) {
            supported
        }
    }
`;

const Supported: React.FC<Props> = ({ handle }) => {
    const { data } = useQuery(SUPPORTED, {
        variables: {
            handle
        }
    });

    if(data) {
        return (
            <View>
                {
                    data.user.supported.map((s: string) => {
                        return <Text>{s}</Text>
                    })
                }
            </View>
        );
    } else {
        return <Text>Loading</Text>
    }
}

export default Supported;