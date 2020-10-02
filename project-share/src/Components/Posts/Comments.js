import React, { useEffect } from 'react';
import CommentComponent from './Commenting';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Commenting = props => {
    const postId = props.postId;

    useEffect(() => {
        // Get All Comments
        fetch(proxyUrl + url + 'getComment')
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(() => console.error('Could not connect to backend, maybe it is your browser?'))

        
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