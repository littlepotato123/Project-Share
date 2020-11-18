import React, { useEffect, useState } from 'react';
import {
    useHistory
} from 'react-router-dom';
import { Fetch } from '../../Tools';

const Navigation = () => {
    const [value, setValue] = useState(null);

    const push = () => {
        if(value) {
            history.push(`/user/${value}`)
        } else {
            alert('No Value');
        }
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
            const scoped = async () => {
                const res = await Fetch(`
                    {
                        tokenUser(token: "${t}") {
                            handle
                        }
                    } 
                `);
                if(res.tokenUser) {
                    console.log(res.tokenUser.handle);
                    setAuthentication(
                        <div>
                            <a className="authentication" href={`http://localhost:3000/user/${res.tokenUser.handle}`}>{res.tokenUser.handle}</a>
                            <a className="authentication" href="/newpost">New Post</a>
                            <button className="authentication" onClick={logout}>Logout</button>
                        </div>
                    )
                } else {
                    history.push('/auth')
                }
            }

            scoped();
        } else {
            setAuthentication(<a className="authentication" href="/auth">Authentication</a>)
        }
    }, [])

    const handleKeyPress = (e) => {
        if(e.key == 'Enter') {
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
                    placeholder="Search (Ex. Category: Racism)"
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