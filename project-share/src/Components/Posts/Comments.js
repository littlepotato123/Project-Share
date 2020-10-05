import React, { useEffect } from 'react';
import CommentComponent from './Commenting';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Commenting = props => {
    useEffect(() => {
        // Get All Comments
        fetch(proxyUrl + url + 'getComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.id
            })
        })
        .then(res => res.json)
        .then(data => console.log(data))

        // Creating Comments
    })

    return (
        <div>
            Comments
            <input />
        </div>
    )
}

export default Commenting;