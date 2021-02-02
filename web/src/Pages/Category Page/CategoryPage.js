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
        const scoped = async () => {
            const res = await Fetch(`
                {
                    one_category(title:"${name}") {
                        id
                        title
                        description
                    }  
                    category_posts(title:"${name}"){
                        id
                        title
                        category
                        likes
                        body
                        author
                    }
                }
            `)
            console.log(res);
            if(res) {
                setTitle(res.one_category.title);
                setPosts(res.category_posts);
                setDescription(res.one_category.description);
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