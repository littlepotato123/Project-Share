import React from 'react';

const List = (props) => {
    return (
        <div>
            <p>{props.body}</p>
            <p>Author: <a href={`${process.env.REACT_APP_URL}/user/${props.author}`}>{props.author}</a></p>
        </div>
    )
}

export default List;