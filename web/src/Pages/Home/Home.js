import { gql, useQuery } from '@apollo/client';
import React from 'react';

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

    if(loading) return <p>Loading Homepage...</p>

    if(error) {
        window.location.reload();
    }

    return (
        <div>
            {
                data.homepage.map((post) => {
                    return (
                        <div>
                            {post.id}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;