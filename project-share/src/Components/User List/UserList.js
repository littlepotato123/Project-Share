import React from 'react'

const UserList = (props) => {
    return (
        <div className='leaderboard'>
            <ol>
                <li>
                    <div>
                        <span>User: {props.name}</span> <br />
                        Supporters: {props.supporters}
                    </div>
                </li>

            </ol>
        </div>
    )
}

export default UserList;