import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Posts from '../../Components/Posts/Posts';
import { Fetch } from '../../Tools';

const CategoryPage = () => {
    const [posts, setPosts] = useState([]);
    const [description, setDescription] = useState('');
    const { name } = useParams();
    const [title, setTitle] = useState('');

    const history = useHistory();

    useEffect(() => {
        const f = async () => {
            const res = await Fetch(`
                {
                    getCategory(category:"${name}") {
                        id
                        title
                        description
                    }  
                }
            `)
            if(res.getCategory) {
                setTitle(res.getCategory.title);
                setDescription(res.getCategory.description);
            } else {
                history.push('/wrongcategory');
            }
        }

        f();

        const scoped = async () => {
            const res = await Fetch(`
                    {
                        categoryPosts(category:"${name}"){
                            id
                            title
                            category
                            likes
                            body
                            author
                        }
                    }
            `);
            if(res) {
                setPosts(res.categoryPosts);
            } else {
                history.push('/home');
            }
        }

        scoped();
    }, [name]);

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '48px', textDecoration: 'underline' }}>{title}</h1>
            <p style={{ textAlign: 'center', fontSize: '30px', textDecoration: 'none' }}>Description: {description}</p>
            { 
                posts.map(post => <Posts author={post.author} id={post.id} title={post.title} category={post.category} likes={post.likes}>{ post.body }</Posts>)
            }
        </div>
    )
}

export default CategoryPage;