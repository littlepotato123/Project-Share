import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Posts from '../../Components/Posts/Posts';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const CategoryPage = () => {
    const [posts, setPosts] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        fetch(proxyUrl + url + 'getAllPostsCategory', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            body: JSON.stringify({ category: name })
        })
            .then(x => x.json())
            .then(res => setPosts(res))
    })

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