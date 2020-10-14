import React, { useEffect, useState } from 'react'

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
            Leaderboard
        </div>
    )
}

export default Leaderboard;