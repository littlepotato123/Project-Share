import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Picker, Text, TextInput, View } from 'react-native';
import { Category } from '../Tools';

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

const GET_CATEGORIES = gql`
    {
        categories: all_categories {
            id
            title
            description
        }
    }
`;

const GetDate = () => {
    let date = new Date();
    const str = date.toString().split(' ');
    return `${str[1]} ${str[2]} ${str[3]}`;
}

const NewPost: React.FC<Props> = ({ token }) => {
    const [create] = useMutation(NEW_POST);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('');
    const { data } = useQuery(GET_CATEGORIES);
    const createdAt = GetDate();

    const submit = () => {
        create({ variables: {
            input: {
                token,
                title,
                body,
                category,
                createdAt
            }
        } }).then(() => alert('Success')).catch(e => alert('Error'))
    }

    if(data) {
        return (
            <View>
                <TextInput 
                    value={title} 
                    onChangeText={e => setTitle(e)}
                />
                <Picker
                    selectedValue={category} 
                    onValueChange={(value, _) => setCategory(value)}
                >
                    {
                        data.categories.map((c: Category) => <Picker.Item key={c.id} label={c.title} value={c.title} />)
                    }
                </Picker>
                <TextInput 
                    value={body}
                    onChangeText={e => setBody(e)}
                    maxLength={1000}
                />
                <Button
                    title="Submit"
                    onPress={submit}
                />
            </View>
        );
    } else {
        return <Text>Loading...</Text>
    }
    
}

export default NewPost;