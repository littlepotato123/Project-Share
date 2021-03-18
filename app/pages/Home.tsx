import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import { Post } from '../Tools';

const HOME_PAGE = gql`
    {
        posts: homepage {
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

const Home: React.FC = () => {
    const { loading, data } = useQuery(HOME_PAGE);

    if(loading) return <Text>Loading...</Text>

    if(data) {
        console.log(data.posts);
    }

    return (
        <View>
            {
                data.posts.map((post: Post) => <Text>{post.body}</Text>)
            }
        </View>
    );
}

export default Home;