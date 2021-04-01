import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    handle: string | null;
}

const SUPPORTING = gql`
    query user($handle: String!) {
        user: user_handle(handle: $handle) {
            supporting
        }
    }
`;

const Supporting: React.FC<Props> = ({ handle }) => {
    const { data } = useQuery(SUPPORTING, {
        variables: {
            handle
        }
    });

    if(data) {
        return (
            <View>
                {
                    data.user.supporting.map((s: string) => {
                        return <Text>{s}</Text>
                    })
                }
            </View>
        ) 
    } else {
        return <Text>Loading...</Text>
    }
}

export default Supporting;