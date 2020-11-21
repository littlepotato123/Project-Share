import React, { useEffect, useState } from 'react';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');

    let token;

    useEffect(() => {
        token = sessionStorage.getItem('token');
    })

    const post = () => {

    }

    return (
        <div>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title of Post" />
            <input value={body} onChange={e => setBody(e.target.value)} placeholder="Post Content" />
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category of Post" />
            <button onClick={post}>Post</button>
        </div>
    )
}

export default NewPost;