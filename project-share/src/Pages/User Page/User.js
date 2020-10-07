import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://us-central1-project-share-8df06.cloudfunctions.net/api/';

const User = () => {
    const { userHandle } = useParams();
    const [user, setUser] = useState(null);
    const [count, setCount] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if(count < 2) {
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
            .then(data => {
                console.log(data.user);
                if(data.user == undefined) {
                    history.push('/wronguser');
                } else {
                    console.log('Got Correct Data');
                }
            })
            setCount(count + 1);
        }
    }, [])

    return (
        <div>
            Hello
        </div>
    )
}

export default User;