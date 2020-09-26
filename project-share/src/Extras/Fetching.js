import React from 'react'

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Fetching = () => {
    const fetching = () => {
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
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNjYzOGY4NDlkODVhNWVkMGQ1M2NkNDI1MzE0Y2Q1MGYwYjY1YWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvamVjdC1zaGFyZS04ZGYwNiIsImF1ZCI6InByb2plY3Qtc2hhcmUtOGRmMDYiLCJhdXRoX3RpbWUiOjE2MDExNDk4NjIsInVzZXJfaWQiOiJKdTNTM0VsaUZHV1VyTEFlN0h3Y3JaNGk2YVoyIiwic3ViIjoiSnUzUzNFbGlGR1dVckxBZTdId2NyWjRpNmFaMiIsImlhdCI6MTYwMTE0OTg2MiwiZXhwIjoxNjAxMTUzNDYyLCJlbWFpbCI6Im9tQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJvbUBlbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.gsnp7hKUfKiMAEoM5Qr7JRLUYYTzQ-LsteltGeKWZu3ECdJiwWzIkw5VegxHlnqooaOLICWMGidZs9um7gFJQRg1vVFYaKMwSooCA4xML4ExxxHjZm_pWpB6v1iBIUdJ1zHWOD5eCE3ofct1oMOm7iiRFLC6FzSInUwPkLaLnoOIatpbO6XX9R6ZXuJ9ulOSEf3QRNH6XKJLkfWGmh_I7KFJ4lV3BrKw9nqEBuSdDrBt2LyhZAaJT2j0daTK29ciF5IZZ1zMrGcAu-6USsgnKj8Qw8uLpPLxGhK8BrT3gGhTrHxo7vrHeQ_z6V0FcsQrfGcUODwmYOWrTySDe2Jc7w'
            },
            body: JSON.stringify({
                "title": "om's Title",
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
    };

    return (
        <div>
            { fetching() }
        </div>
    )
}

export default Fetching;