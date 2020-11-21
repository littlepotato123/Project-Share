import React, { useEffect, useState } from 'react';
import {
    useHistory
} from 'react-router-dom';

const Navigation = () => {
    const [value, setValue] = useState(null);
    const [url, setUrl] = useState(null);

    const push = () => {
        if (value) {
            history.push(`/user/${value}`)
        } else {
            alert('No Value');
        }
    }

    const [authentication, setAuthentication] = useState(null);

    const logout = () => {
        if (window.confirm("Are You Sure You want to logout")) {
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

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            push();
        }
    }

    return (
        <div className="nav">
            <header className="header">
                <a className="project-Share" href="/">Project Sh@re</a>
                <input
                    className='searchBar'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Search by Username"
                    onKeyPress={e => handleKeyPress(e)}
                />
                <button className="search-button" onClick={push}>Search</button>
                <a className="trending" href="/trending">Trending</a>
                <a className="leaderboard" href="/leaderboard">Leaderboard</a>
                <a className="categories" href="/categories">Categories</a>
                {authentication}
            </header>
        </div>
    )
}

export default Navigation;