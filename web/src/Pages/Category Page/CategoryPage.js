import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Posts from '../../Components/Posts/Posts';
import { Fetch } from '../../Tools';

const CategoryPage = () => {
    const [posts, setPosts] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                    {
                        categoryPosts(category:"First"){
                            id
                            title
                            category
                            likes
                            body
                            author
                        }
                    }
            `);
            setPosts(res.categoryPosts);
        }

        scoped();
    })

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '48px', textDecoration: 'underline' }}>{name}</h1>
            { 
                posts.map(post => <Posts author={post.author} id={post.id} title={post.title} category={post.category} likes={post.likes}>{ post.body }</Posts>)
            }
        </div>
    )
}

export default CategoryPage;