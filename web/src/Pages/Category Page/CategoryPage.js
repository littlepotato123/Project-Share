import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Posts from '../../Components/Posts/Posts';
import { Fetch } from '../../Tools';

const CategoryPage = () => {
    const [posts, setPosts] = useState([]);
    const { name } = useParams();

    const history = useHistory();

    useEffect(() => {
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
            if(res.categoryPosts.length !== 0) {
                setPosts(res.categoryPosts);
            } else {
                console.log('error')
                history.push('/');
            }
        }

        scoped();
    }, [])

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