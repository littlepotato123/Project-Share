import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Commenting from './Comments';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";
const Posts = (props) => {
    const [showComment, setComments] = useState(false);
    const [liked, setLiked] = useState(false);

    const idToken = useSelector(state => state.idToken);

    let comments = null;

    let likes = parseInt(props.likes)

    if(showComment) {
        comments = (
            <Commenting id={props.id} />
        )
    }

    if(liked) {
        likes += 1;
    }

    return (
        <div key={props.id} className="post-content">
            <p className="post-title">{ props.title }</p>
            <p className="post-category">Category: { props.category }</p>
            <p className="post-author">Author: { props.author }</p>
            <p className="post-body">{ props.children }</p>
            <p className="post-likes"><button onClick={() => setLiked(true)}>Likes</button><span>{ likes }</span></p>
            {/* Add Commenting */}
            <button className="post-comment-button" onClick={() => setComments(!showComment)}>Comments</button>
            { comments }
        </div>
    )
}

export default Posts;