import React from 'react';
import { Text, View } from 'react-native';
import { Comment } from '../../Tools';

interface Props {
    comment: Comment;
}

const Comments: React.FC<Props> = ({ comment }) => {
    return (
        <View>
            <Text>{comment.author}</Text>
            <Text>{comment.body}</Text>
        </View>
    );
}

export default Comments;