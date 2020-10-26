import React from 'react';
import Post from '../Posts/Posts';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const CategoryList = (props) => {
    const getPost = () => {
        fetch(proxyUrl + url + 'getCategoryPost', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            body: JSON.stringify({
                category: props.title
            })
        })
        .then(x => x.json())
        .then(data => console.log(data.post))
    }

    return (
        <div className="category-list-item">
            <h1>{props.title}</h1>
            <button onClick={getPost}>Sample Post</button>
        </div>
    );
};

export default CategoryList;