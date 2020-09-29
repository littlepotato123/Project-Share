import React, { useEffect } from 'react'

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Fetching = () => {
    useEffect(() => {
        // Get Requests
        fetch(proxyUrl + url + 'getHome')
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(() => console.log("Couldn't connect to " + url + " request. Check your browser"));
        
        // Post Requests and Headers
        fetch(proxyUrl + url + 'createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNjYzOGY4NDlkODVhNWVkMGQ1M2NkNDI1MzE0Y2Q1MGYwYjY1YWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC1zaGFyZS04ZGYwNiIsImF1ZCI6InByb2plY3Qtc2hhcmUtOGRmMDYiLCJhdXRoX3RpbWUiOjE2MDEyOTM2NjgsInVzZXJfaWQiOiJKdTNTM0VsaUZHV1VyTEFlN0h3Y3JaNGk2YVoyIiwic3ViIjoiSnUzUzNFbGlGR1dVckxBZTdId2NyWjRpNmFaMiIsImlhdCI6MTYwMTI5MzY2OCwiZXhwIjoxNjAxMjk3MjY4LCJlbWFpbCI6Im9tQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJvbUBlbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.IuIvnh65XCWnzMolk__2Oahp5jG7rLL6wytFjxG9Si_NxevhbgKfGNv8FiGyJHYfKDQuzEoIqjEGIYawePD8QFlK5EjSJLQu35GB4f2iFYyTfEd6Q2PcbzU85JEv3_l_gzL-wcocRqVMtW4S5UjYUyFLjLT4dZFKdcnUQ7viB07hpyBugLm-yvhC_tfdDlkfqrSSv0YtrbX0O6MPXoAWUtTt1HVJqznH3t4Mcu-Vf2DL1TYCJWuaRo2_qXXBFh532hx-goJ2ZBEu0f3P-9K5NQtagapiWd1MnSCvzUHzCrqCN8UzHmhnSp9ERwl62aU5JTveAonzACOH81LEuZ3BLw'
            },
            body: JSON.stringify({
                "title": "padmini's Title",
                "body": "This is fetch's body",
                "category": "Brown Bois"
            }) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        })
    })

    return (
        <div>
            Example, check console for data!
        </div>
    )
}

export default Fetching;