import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import Posts from '../components/Post/Posts';
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

interface Props {
    token: string;
}

const Home: React.FC<Props> = ({ token }) => {
    const { loading, data } = useQuery(HOME_PAGE);

    if(data) {
        return (
            <View>
                {
                    data.posts.map((post: Post) => <Posts token={token} post={post} />)
                }
            </View>
        );
    } else if(loading) {
        return <Text>Loading...</Text>
    } else {
        return <Text>Error Occured</Text>
    }
}

export default Home;