import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import Posts from '../components/Post/Posts';
import { Post } from '../Tools';

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

interface Props {
    token: string;
}

const Trending: React.FC<Props> = ({ token }) => {
    const { data } = useQuery(TRENDING);

    if(data) {
        return (
            <View>
                {
                    data.posts.map((post: Post) => <Posts token={token} post={post} />)
                }
            </View>
        );
    } else {
        return <Text>Loading...</Text>
    }
}

export default Trending;