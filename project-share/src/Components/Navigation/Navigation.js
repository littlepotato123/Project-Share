import React, { useEffect, useState } from 'react'


const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const aurl = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Navigation = () => {
    const [value, setValue] = useState(null);
    const [url, setUrl] = useState(null);
    const [userUrl, setUserUrl] = useState(null);

    const setting = e => {
        setValue(e.target.value);
        setUrl(`/user/${e.target.value}`)
    }
    const [authentication, setAuthentication] = useState(null);

    useEffect(() => {
        const data = sessionStorage.getItem('token');
        if (data !== null) {
            fetch(proxyUrl + aurl + 'getHandle', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${data}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.handle);
                    setAuthentication(<a className="authentication" href={`/user/${data.handle}`}>{data.handle}</a>)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setAuthentication(<a className="authentication" href="/auth">Authentication</a>)
        }
    }, [])

    return (
        <div className="nav">
            <header className="header">
                <a className="project-Share" href="/">Project Sh@are</a>
                <a className="searchButton" href={url}>Search</a>
                <input
                    className='searchBar'
                    value={value}
                    onChange={e => setting(e)}
                    placeholder="Search by Username"
                />
                <a className="trending" href="/trending">Trending</a>
                <a className="leaderboard" href="/leaderboard">Leaderboard</a>
                <a className="categories" href="/categories">Categories</a>
                {authentication}
            </header>
        </div>
    )
}

export default Navigation;