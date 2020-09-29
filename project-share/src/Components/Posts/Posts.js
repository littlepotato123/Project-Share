import React from 'react'

const Posts = (props) => {
    return (
        <div>
            <h1>{ props.title }</h1>
            <h2>{ props.category }</h2>
            <h3>{ props.author }</h3>
            <h4>{ props.children }</h4>
        </div>
    )
}

export default Posts;