import React from 'react';

const List = (props) => {
    return (
        <div>
            <h3>{props.author}</h3>
            <h4>{props.body}</h4>
        </div>
    )
}

export default List;