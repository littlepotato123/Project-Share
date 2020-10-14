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
    const [supporters, setSupporters] = useState(null);

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
                    history.push('/wronguser');
                } else {
                    setUser(data.user);
                    setSupporters(data.user.supporters);
                }
            }
        })
    }, [])

    const follow = () => {
        setSupporters(supporters + 1);
    }
    

    let followButton = (
        <button onClick={follow}>Follow</button>
    )

    let userInfo = (
        <div>
            {user.handle} <br />
            {supporters} <br />
            {user.email} <br />
            {followButton}     
        </div>
    )

    return (
        <div>
            { Object.keys(user).length === 0 ? <Loading /> : userInfo}
        </div>
    )
}

export default User;