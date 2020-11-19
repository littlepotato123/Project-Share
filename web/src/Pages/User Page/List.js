import React from 'react';

const List = (props) => {
    return (
        <div>
            <h1>{props.body}</h1>
            <h3>{props.author}</h3>
        </div>
    )
}

export default List;