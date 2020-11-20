import React from 'react';

const UserList = (props) => {

    return (
        <div className='leaderboardList'>
            <ol>
                {/*
                    - Add a Sample Post
                    - Better Format
                    - Transition between base to hover styles
                */}
                <ol>
                    <div>
                        <span className="Lacc"><a href={`http://localhost:3000/user/${props.name}`}>{props.name}</a></span> <br />
                    </div>
                </ol>

            </ol>
        </div>
    )
}

export default UserList;