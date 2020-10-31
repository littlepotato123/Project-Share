import React, { useEffect, useState } from 'react'
import Commenting from './Comments';

const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Posts = (props) => {
    const [showComment, setComments] = useState(false);
    const [liked, setLiked] = useState(null);

    let comments = null;

    let likes = parseInt(props.likes)
    let likesButton = (
        <button onClick={() => setLiked(true)}>Like</button>
    );

    console.log(props.token);

    if (showComment) {
        comments = (
            <Commenting id={props.id} token={props.token} />
        )
    }

    if (liked == null) {
        likesButton = (
            <button onClick={() => setLiked(true)}>Like</button>
        );
    }

    const like = () => {
        const post = {
            body: props.children,
            author: props.author,
            title: props.title,
            category: props.category,
            likes,
            id: props.id
        };

        likes = post.likes + 1;

        fetch(url + 'likePost', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            body: JSON.stringify(post)
        })
    }

    if (liked == true) {
        like();
        likesButton = (
            <button onClick={() => setLiked(false)}>Unlike</button>
        )
    }

    const unlike = () => {
        const post = {
            body: props.children,
            author: props.author,
            title: props.title,
            category: props.category,
            likes: parseInt(props.likes + 1) - 1,
            id: props.id
        };

        likes = props.likes + 1 - 1;

        fetch(url + 'unlikePost', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            body: JSON.stringify(post)
        })
    }

    if (liked == false) {
        unlike();
        likesButton = (
            <button onClick={() => setLiked(true)}>Like</button>
        );
    }

    return (
        <div key={props.id} className="post-content">
            <p className="post-title">{props.title}</p>
            <p className="post-category">Category: {props.category}</p>
            <p className="post-author">Author: {props.author}</p>
            <p className="post-body">{props.children}</p>
            <p className="post-likes">{likesButton}<span>{likes}</span></p>
            {/* Add Commenting */}
            <button className="post-comment-button" onClick={() => setComments(!showComment)}>Comments</button>
            { comments}
        </div>
    )
}

export default Posts;