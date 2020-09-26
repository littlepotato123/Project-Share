import React from 'react'

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";
const callFunction = "getHome";

const Fetching = () => {
    const component = () => {
        fetch(proxyUrl + url + callFunction)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div>
            { component() }
        </div>
    )
}

export default Fetching