import React, { useState } from 'react';
import Post from '../Posts/Posts';

const CategoryList = (props) => {
    const [post, setPost] = useState(null);
  
    const getPost = () => {
    }

    return (
        <div className="category-list-item">
            <h1>{props.title}</h1>
            <button onClick={getPost}>Display Posts</button>
            {
                post ? <Post author={post.author} title={post.title} category={post.category} likes={post.likes} id={post.id}>{ post.body }</Post> : null
            }
        </div>
    );
};

export default CategoryList;