import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Comments } from '../../Tools';

interface Props {
    id: number;
};

const GET_COMMENTS = gql`
    query get_comments($id: Int!) {
        comments: get_comments(id: $id) {
            id
            body
            author
        }
    }
`;

const NEW_COMMENT = gql`
    mutation create_comment($input: CreateCommentInput!) {
        create_comment(input: $input) {
            id
            body
            author
        }
    }
`;

const Comment: React.FC<Props> = ({ id }) => {
    const { data } = useQuery(GET_COMMENTS, {
        variables: {
            id
        }
    });

    const [create] = useMutation(NEW_COMMENT);
    const [text, setText] = useState('');

    if(data) {
        return (
            <View>
                {
                    data.comments.map((c: Comments) => {
                        return (
                            <View>
                                <Text>{c.body}</Text>
                                <Text>{c.author}</Text>
                            </View>
                        )
                    })
                }
                <TextInput
                    value={text}
                    placeholder="Type In Anything you want to comment"
                    onChangeText={(e) => setText(e)}
                />
                <Button
                    title="Create"
                    onPress={() => {
                        create({
                            variables: {
                                input: {
                                    body: text,
                                    // token
                                    postId: id
                                }
                            }
                        });
                    }}
                />
            </View>
        )
    } else {
        return <Text>Loading...</Text>
    }
}

export default Comment;