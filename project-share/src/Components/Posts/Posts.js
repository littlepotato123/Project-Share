import React, { useEffect, useState } from 'react'
import Commenting from './Comments';

const Posts = (props) => {
    const [showComment, setComments] = useState(false);

    let comments = null;

    if(showComment) {
        comments = (
            <Commenting id={props.id} />
        )
    }

    return (
        <div key={props.id} className="post-content">
            <p className="post-title">{ props.title }</p>
            <p className="post-category">Category: { props.category }</p>
            <p className="post-author">Author: { props.author }</p>
            <p className="post-body">{ props.children }</p>
            <p className="post-likes"><span>Likes: </span><span>{ props.likes }</span></p>
            {/* Add Commenting */}
            <button className="post-comment-button" onClick={() => setComments(!showComment)}>Comments</button>
            { comments }
        </div>
    )
}

export default Posts;