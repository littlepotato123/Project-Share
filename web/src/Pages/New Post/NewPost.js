import React, { useEffect, useState } from 'react';
import {
    useHistory
} from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { Fetch } from '../../Tools';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState(null);

    const history = useHistory();

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    getCategories {
                        title
                    }
                }
            `);
            setCategories(res.getCategories);
        };
        scoped();
    }, [])

    console.log(categories);

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
        console.log(title, body, category);

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
            <select onChange={e => setCategory(e.target.value)}>
                <option value=""></option>
                {
                    categories ? categories.map(c => <option value={c.title}>{c.title}</option>) : <Loading />
                }
            </select>
            <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Post Body" onKeyDown={handleKey}></textarea>
            <button onClick={post}>Post</button>
        </div>
    )
}

export default NewPost;