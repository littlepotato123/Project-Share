import React, { useState } from 'react';
import {
    useHistory
} from 'react-router-dom';
import { Fetch } from '../../Tools';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');

    const history = useHistory();

    const post = () => {
        const scoped = async () => {
            const token = sessionStorage.getItem('token');
            const res = await Fetch(`
                mutation {
                    newPost(token: "${token}", title: "${title}", body: "${body}", category: "${category}") {
                        id
                    }
                } 
            `);
            if(res.newPost) {
                history.push('/');
            } else {
                alert('Error while posting');
            }
        } 

        if(title && body && category) {
            if(category.includes('@') || category.includes('/') || category.includes('?') || category.includes('#') || category.includes('$')) {
                alert('Wierd Characters in Category');
            } else {
                scoped();
            }
        } else {
            alert('Some fields are empty');
        }
    }

    const handleKey = (e) => {
        if(e.key == "Enter") {
            post();
        }
    }

    return (
        <div>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title of Post" />
            {/* <input value={body} onChange={e => setBody(e.target.value)} placeholder="Post Content" /> */}
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category of Post" />
            <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Post Body" onKeyDown={handleKey}></textarea>
            <button onClick={post}>Post</button>
        </div>
    )
}

export default NewPost;