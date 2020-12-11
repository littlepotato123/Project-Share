import React from 'react';

const List = (props) => {
    return (
        <div>
            <p>{props.body}</p>
            <p>Author: <a href={`/user/${props.author}`}>{props.author}</a></p>
        </div>
    )
}

export default List;