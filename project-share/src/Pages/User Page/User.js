import React, { useEffect, useState } from 'react'
import {
    useHistory,
    useParams
} from 'react-router-dom'
import Loading from '../../Components/Loading/Loading';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const User = () => {
    const [user, setUser] = useState({});

    const { userHandle } = useParams();
    
    const history = useHistory();

    useEffect(() => {
        fetch(proxyUrl + url + 'getUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            body: JSON.stringify({
                userHandle: userHandle
            })
        })
        .then(res => res.json())
        .then(data => {
            if(typeof data == 'object') {
                if(Object.keys(data).length === 0) {
                    console.log("empty");
                } else {
                    setUser(data.user);
                }
            }
        })
    }, [])

    const support = () => {
        fetch(proxyUrl + url + '/followUser', {
            supporters: user.supporters,
            handle: user.handle,
            email: user.email,
            createdAt: user.createdAt,
            userId: user.userId
        })
    }

    let userInfo = (
        <div>
            {user.handle} <br />
            {user.supporters} <br />
            <button onClick={support}>Support this creator</button> <br />
            {user.email}
        </div>
    )

    return (
        <div>
            { user ? userInfo : <Loading />}
        </div>
    )
}

export default User;