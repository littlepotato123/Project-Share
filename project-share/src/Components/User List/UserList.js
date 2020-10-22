import React from 'react'

const UserList = (props) => {
    return (
        <div className='leaderboard'>
            <ol>
                {/*
                * Note: We need to add their account names as hyperlinks
                * Note: We need to fix spacing and indentation
                * Note: Discuss the sizes of everything
                */}
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