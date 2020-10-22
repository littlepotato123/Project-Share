import React from 'react'

const UserList = (props) => {
    return (
        <div className='leaderboard'>
            <ol>
                {/*
                * Note: We need rankings 
                * Note: We need to add their account names as hyperlinks
                * Note: We need to fix spacing and indentation
                * Note: Discuss the sizes of everything
                */}

                User: {props.name} <br />
                Supporters: {props.supporters}
            </ol>
        </div>
    )
}

export default UserList;