import React, { useEffect } from 'react'

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Fetching = () => {
    useEffect(() => {
        fetch(proxyUrl + url + 'getHome')
            .then(res => res.json())
            .then(data => console.log(data))

        fetch(proxyUrl + url + 'createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer (Random Token)'
            },
            body: JSON.stringify({
                title: 'Om Is Awesome'
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
    });

    return (
        <div>
            Fetching
        </div>
    )
}

export default Fetching;