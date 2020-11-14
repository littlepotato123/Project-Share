import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Posts from '../../Components/Posts/Posts';

const CategoryPage = () => {
    const [posts, setPosts] = useState([]);
    const { name } = useParams();

    return (
        <div>
            <h1>{name}</h1>
            { 
                posts.map(post => <Posts author={post.author} id={post.id} title={post.title} category={post.category} likes={post.likes}>{ post.body }</Posts>)
            }
        </div>
    )
}

export default CategoryPage;