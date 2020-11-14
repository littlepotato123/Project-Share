import React, { useEffect, useState } from 'react';
import {
    useHistory
} from 'react-router-dom';

const Navigation = () => {
    const [value, setValue] = useState(null);
    const [url, setUrl] = useState(null);

    const setting = e => {
        setValue(e.target.value);
        setUrl(`/user/${e.target.value}`)
    }
    const [authentication, setAuthentication] = useState(null);

    const logout = () => {
        if(window.confirm("Are You Sure You want to logout")) {
            sessionStorage.removeItem('token');
            window.location.reload(false);
        }
    }

    let history = useHistory();

    useEffect(() => {
        const t = sessionStorage.getItem('token');
        if (t !== null) {

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