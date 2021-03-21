import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import Post from '../components/Posts/Post';
import { Posts } from '../Tools';

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

export default Home;