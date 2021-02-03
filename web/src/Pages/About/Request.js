import React from 'react';

const Requests = (props) => {
    return (
        <div key={props.id}>
            <strong>{props.name}</strong>: {props.description}
        </div>
    )
}

export default Requests;