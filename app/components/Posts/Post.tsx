import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Posts } from '../../Tools';
import Comment from './Comment';

interface Props {
    post: Posts
}

const Post: React.FC<Props> = ({
    post: { id, title, author, body, category, likes, liked, createdAt }
}) => {
    const [_likes, setLikes] = useState(likes);
    const [_liked, setLiked] = useState(false);

    const like = () => {
        setLiked(!_liked);
    };

    const unlike = () => {
        setLiked(!_liked);
    };

    return (
        <View>
            <Text>{createdAt}</Text>
            <Text>{title}</Text>
            <Text>{author}</Text>
            <Text>{body}</Text>
            <Text>{category}</Text>
            <Text>{_likes}</Text>
            {
                _liked ? <Button title="Unlike" onPress={unlike} /> : <Button title="Like" onPress={like} />
            } 
            <Comment id={id} />
        </View>
    );
}

export default Post;