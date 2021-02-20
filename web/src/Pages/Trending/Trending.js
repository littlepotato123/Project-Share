import { gql, useQuery } from '@apollo/client';
import React from 'react';

const TRENDING = gql`
    query {
        trending_posts {
            id
            title
            author
            category
            body
            createdAt
            likes
            liked
        }
    }
`;

const Trending = () => {
    const { loading, error, data } = useQuery(TRENDING);

    if(loading) return <p>Loading...</p>

    if(error) window.location.reload();

    return (
        <div>
            {
                data.trending_posts.map(p => <div>{p.title}</div>)
            }
        </div>
    )
}

export default Trending;