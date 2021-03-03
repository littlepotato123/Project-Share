import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Post from '../../Components/Posts/Post';

const HOME_PAGE = gql`
    {
        homepage {
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

const Home = () => {
    const { loading, error, data } = useQuery(HOME_PAGE);

    if (loading) return <p>Loading Homepage...</p>

    if (error) {
        window.location.reload();
    }

    return (
        <div>
            {
                data.homepage.map((post) => {
                    return (
                        <Post
                            id={post.id} 
                            title={post.title}
                            category={post.category}
                            author={post.author}
                            body={post.body}
                            likes={post.likes}
                            liked={post.liked}
                            createdAt={post.createdAt}
                        />
                    )
                })
            }
        </div>
    )
}

export default Home;