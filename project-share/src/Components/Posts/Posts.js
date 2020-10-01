import React, { useState } from 'react'
import Commenting from './Comments';

const Posts = (props) => {
    const [showComment, setComments] = useState(false);

    let comments = null;

    if(showComment) {
        comments
    }

    return (
        <div key={props.key} className="post-content">
            <h1 className="post-title">{ props.title }</h1>
            <h2 className="post-category">Category: { props.category }</h2>
            <h3 className="post-author">{ props.author }</h3>
            <h4 className="post-body">{ props.children }</h4>
            <h5 className="post-likes">Likes: <span>{ props.likes }</span></h5>
            {/* Add Commenting */}
            <h4 className="post-comments" onClick={() => setComments(false)}></h4>
            { comments }
        </div>
    )
}

export default Posts;