import React, { useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading';
import UserList from '../../Components/User List/UserList';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Leaderboard = () => {

    const [leaderbaord, setLeaderboard] = useState(null)

    useEffect(() => {
        fetch(proxyUrl + url + 'leaderboard')
            .then(res => res.json())
            .then(data => setLeaderboard(data))
    }, [])


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