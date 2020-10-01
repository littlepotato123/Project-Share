import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://us-central1-project-share-8df06.cloudfunctions.net/api/';

const User = () => {
    const { userHandle } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(proxyUrl + url + 'getUser', {
            method: 'POST',
            body: JSON.stringify({
                "userHandle": userHandle
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => setUser(data.user))
        .catch(() => console.log("Couldn't connect to " + url + "getUser . Check your browser maybe?"))
    })

    return (
        <div>
            Hello
        </div>
    )
}

export default User;