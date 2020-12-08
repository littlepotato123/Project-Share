import React from 'react';

const UserList = (props) => {

    return (
        <div>
            <span><a href={`http://localhost:3000/user/${props.name}`}>{props.name}</a></span> <br />
        </div>
    )
}

export default UserList;