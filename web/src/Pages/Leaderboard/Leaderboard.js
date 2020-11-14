import React, { useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import UserList from '../../Components/User List/UserList';

const Leaderboard = () => {
    const [leaderbaord, setLeaderboard] = useState(null)

    return (
        <div>
            {leaderbaord ?
                leaderbaord.map(user => < UserList name={user.handle} supporters={user.supporters} id={user.userId} />)
                :
                <Loading />
            }
        </div>
    )
}

export default Leaderboard;