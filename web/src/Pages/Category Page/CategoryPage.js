import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';

const CATEGORY_GET = gql`
    query one_category($title: String!){
        category: one_category(title:$title){
            id
            title
            description
        }
        posts: category_posts(title: $title) {
            id
            title
            author
            body
            category
            createdAt
            likes
            liked
        }
    }
`;

const CategoryPage = () => {
    const { name } = useParams();

    const { loading, error, data } = useQuery(CATEGORY_GET, {
        variables: {
            title: name
        }
    });

    if(loading) return <p>Loading...</p>

    if(error) {
        return <p>Hello</p>     
    }

    return (
        <div>
            {data.category.title} <br />
            {data.category.description} <br />
            {data.posts.map(post => {
                return (
                    <div>
                        {post.author}
                    </div>
                )
            })}
        </div>
    )
}

export default CategoryPage;