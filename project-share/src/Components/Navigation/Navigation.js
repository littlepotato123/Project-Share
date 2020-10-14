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
    
    // Get Id Token from storage

    // Check if it is null or not
         // If Null then show default
            // Alert
        // If not null then fetch and get username
            // Change default to create post and User Page

    // Use Effect

    // Get id token
    //If null  
    // Alert
    // If =! null
    //Link to other page

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