import React from 'react'

const Storage = () => {
    const setData = () => {
        sessionStorage.setItem('setData', 'Hello World');
    }

    const getData = () => {
        const data = sessionStorage.getItem('idToken');
        console.log(data);
    }

    return (
        <div>
            <button onClick={setData}>Set Storage</button>
            <button onClick={getData}>Get Storage</button>
        </div>
    )
}

export default Storage;