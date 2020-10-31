import React, { useState, useEffect } from 'react'

const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');

    let token;

    useEffect(() => {
        token = sessionStorage.getItem('token');    
    })

    const post = () => {
        const data = {
            title: title,
            body: body,
            category: category
        };
        fetch(url + 'createPost', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(() => alert("Successfully Posted"))
        .catch((err) => console.log(err))
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