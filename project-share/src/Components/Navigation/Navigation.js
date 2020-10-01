import React, { useState } from 'react'
import {
    useHistory
} from 'react-router-dom'; // For Redirecting Page 

const Navigation = () => {
    let history = useHistory();
    const [value, setValue] = useState(null);

    const search = (e) => {
        if(value !== null) {
            history.push(`/user/${value}`)
        } else {
            e.preventDefault();
        }
    }

    return (
        <div>
            <form onSubmit={search}>
                <button className='searchButton'>Search</button>
                <input 
                    className='searchBar' 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    placeholder="Search by Username"
                />
            </form>
            <a className ='home' href="/">Home</a> <br />
            <a href="/trending">Trending</a><br />
            <a href="/leaderboard">Leaderboard</a><br />
            <a href="/topPosts">Top Posts</a><br />
            <a href="/categories">Categories</a><br />
            </div>
    )
}

export default Navigation;