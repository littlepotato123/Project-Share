import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Comment, Post } from '../../Tools';
import Comments from './Comments';

interface Props {
    token: string;
    post: Post;
}

const GET_COMMENTS = gql`
    query get_comment($id: Int!) {
        comments: get_comments(id: $id) {
            id
            postId
            author
            body
        }
    }
`;

const LIKE = gql`
    mutation like_post($input: LikePostInput!) {
        like_post(input: $input)
    }
`;

const UNLIKE = gql`
    mutation unlike_post($input: LikePostInput!) {
        unlike_post(input: $input)
    }
`;

const Posts: React.FC<Props> = ({ post: {
    author,
    body,
    title,
    likes,
    liked, 
    createdAt,
    category,
    id
}, token }) => {
    const [_like] = useMutation(LIKE);
    const [_unlike] = useMutation(UNLIKE);

    const { data } = useQuery(GET_COMMENTS);
    const [_likes, setLikes] = useState(likes);
    const [_liked, setLiked] = useState(false);

    const like = () => {
        setLiked(!liked);
        _like({
            variables: {
                input: {
                    id,
                    token,
                }
            }
        }).then(data => {
            setLikes(data.data.like_post);
        })
    };

    const unlike = () => {
        setLiked(!liked);
        _unlike({
            variables: {
                input: {
                    id,
                    token
                }
            }
        }).then(data => {
            setLikes(data.data.unlike_post);
        })
    };

    const [button, setButton] = useState<JSX.Element>((<Button title="Like" onPress={like} />));

    useEffect(() => {
        if(_liked == true) {
            setButton(
                <Button
                    title="Unlike"
                    onPress={unlike}
                />
            );
        } else if(_liked == false) {
            setButton(
                <Button
                    title="Like"
                    onPress={like}
                />
            );
        } else {
            alert('Error Occured')
        }
    }, [_liked])

    if(data) {
        return (
            <View key={id}>
                <Text>{body}</Text>
                <Text>{author}</Text>
                <Text>{_likes}</Text>
                <Text>{category}</Text>
                <Text>{createdAt}</Text>
                <Text>{title}</Text>
                {button}
                {
                    data.comments.map((comment: Comment) => <Comments comment={comment} />)
                }
            </View>
        );
    } else {
        return <Text>Loading...</Text>
    }
}

export default Posts;