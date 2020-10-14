import React from 'react'

const UserList = (props) => {
    return (
        <div>
            <li>{props.children}</li>
        </div>
    )
}

export default UserList;