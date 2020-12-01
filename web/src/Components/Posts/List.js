import React from 'react';

const List = (props) => {
    return (
        <div className="comment-div">
            <p className="comment-list-body">{props.body}</p>
            <p className="comment-list-author">Author: <a href={`http://localhost:3000/user/${props.author}`}>{props.author}</a></p>
        </div>
    )
}

export default List;