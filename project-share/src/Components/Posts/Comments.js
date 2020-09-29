import React, { useEffect } from 'react';
import CommentComponent from './Commenting';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Commenting = props => {
    const postId = props.postId;

    useEffect(() => {
        // Get All Comments
        
        // Creating Comments
    })

    return (
        <div>
            Comments
        </div>
    )
}

export default Commenting;