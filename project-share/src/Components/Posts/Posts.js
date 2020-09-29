import React from 'react'
import Commenting from './Comments';

const Posts = (props) => {
    return (
        <div>
            <h1>{ props.title }</h1>
            <h2>{ props.category }</h2>
            <h3>{ props.author }</h3>
            <h4>{ props.children }</h4>
            <h5>{ props.likes }</h5>
            {/* Add Commenting */}
            <Commenting postId={props.id} />
        </div>
    )
}

export default Posts;