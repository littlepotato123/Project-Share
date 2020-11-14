import React, { useEffect, useState } from 'react';
import Commenting from './Comments';

const Posts = (props) => {
    const [showComment, setComments] = useState(false);
    const [liked, setLiked] = useState(null);
    const [likesButton, setButton] = useState((
        <button onClick={() => setLiked(true)}>Like</button>
    ));


    let comments = null;

    let likes = parseInt(props.likes)

    if (showComment) {
        comments = (
            <Commenting id={props.id} token={props.token} />
        )
    }


    useEffect(() => {
        if (liked == null) {
            setButton((
                <button onClick={() => setLiked(true)}>Like</button>
            ));
        }
        if (liked == true) {
            like();
            setButton((
                <button onClick={() => setLiked(false)}>Unlike</button>
            ))
        }
        if (liked == false) {
            unlike();
            setButton((
                <button onClick={() => setLiked(true)}>Like</button>
            ));
        }
        if(sessionStorage.getItem(props.id)) {
            setButton((
                <button disabled="true">Like</button> 
            ))
        }
    }, [liked])

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
    }


    return (
        <div key={props.id} className="post-content">
            <p className="post-title">{props.title}</p>
            <p className="post-category">Category: <a href={`http://localhost:3000/category/${props.category}`}>{props.category}</a></p>
            <p className="post-author">Author: <a href={`http://localhost:3000/user/${props.author}`}>{props.author}</a></p>
            <p className="post-body">{props.children}</p>
            <p className="post-likes">{likesButton}<span>{likes}</span></p>
            <button className="post-comment-button" onClick={() => setComments(!showComment)}>Comments</button>
            { comments}
        </div>
    )
}

export default Posts;