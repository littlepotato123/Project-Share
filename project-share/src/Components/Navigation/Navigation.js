import React, { useState } from 'react'

const Navigation = () => {
    const [value, setValue] = useState(null);
    const [url, setUrl] = useState(null);

    const setting = e => {
        setValue(e.target.value);
        setUrl(`/user/${e.target.value}`)
    }

    let authButtons = (
        <a href="/auth">Authentication</a>
    )

    // Get id token
    const data = sessionStorage.getItem('idToken');
    if (data === null) {
        alert("User not logged it.")
    }
    else (data !== null) {

    }

    return (
        <div className="nav">
            <header className="header">
                <a href="/">Project Sh@are</a>
                <a className="searchButton" href={url}>Search</a>
                <input
                    className='searchBar'
                    value={value}
                    onChange={e => setting(e)}
                    placeholder="Search by Username"
                />
                <a className="nav-link" href="/trending">Trending</a>
                <a className="nav-link" href="/leaderboard">Leaderboard</a>
                <a className="nav-link" href="/topPosts">Top Posts</a>
                <a className="nav-link" href="/categories">Categories</a>
                {authButtons}
            </header>


        </div>
    )
}

export default Navigation;