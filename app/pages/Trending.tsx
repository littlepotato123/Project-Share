import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import Post from '../components/Posts/Post';
import { Posts } from '../Tools';

const TRENDING = gql`
    {
        posts: trending_posts {
            id
            title
            author
            category
            body
            createdAt
            liked
            likes
        }
    }
`;

const Trending: React.FC = () => {
    const { loading, data } = useQuery(TRENDING);

    if(data) {
        return (
            <View>
                {
                    data.posts.map((post: Posts) => <Post post={post} />)
                }
            </View>
        );
    } else {
        return <Text>Loading...</Text>
    }
}

export default Trending;