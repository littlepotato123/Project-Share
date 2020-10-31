import React from 'react'

const UserList = (props) => {

    return (
        <div className='leaderboardList'>
            <ol>
                {/*
                * Tasks left to complete:  Make it so that when you click on the box, it leads the person's account 
                */}
                <ol>
                    <div>
                        <span className="Lacc">{props.name}</span> <br />
                        Supporters:{props.supporters}
                    </div>
                </ol>

            </ol>
        </div>
    )
}

export default UserList;