import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

interface Props {
    token: string;
}

const NEW_POST = gql`
    mutation create_post($input: CreatePostInput!) {
        create_post(input: $input) {
            id
        }
    }
`;

const NewPost: React.FC<Props> = ({ token }) => {
    const [create] = useMutation(NEW_POST);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('');

    return (
        <View>
            <TextInput />
        </View>
    );
}

export default NewPost;