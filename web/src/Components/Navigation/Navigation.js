import React, { useEffect, useState } from 'react';
import {
    useHistory
} from 'react-router-dom';
import { Fetch } from '../../Tools';

const Navigation = () => {
    const [value, setValue] = useState('');
    const [searchAuthor, setSearch] = useState('');

    const click = () => {
        setSearch(!searchAuthor);
    }

    const push = () => {
        if(value) {
            if(searchAuthor == true) {
                history.push(`/user/${value}`)
            } else {
                history.push(`/category/${value}`)
            }
        } else {
            alert('Please Type in Input')
        }
    }

    const [authentication, setAuthentication] = useState(null);

    const logout = () => {
        if(window.confirm("Are You Sure You want to logout")) {
            sessionStorage.clear();
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
                    sessionStorage.setItem('handle', res.tokenUser.handle);
                    setAuthentication(
                        <div>
                            <li className="handle">
                                <a href={`http://localhost:3000/user/${res.tokenUser.handle}`}>{res.tokenUser.handle}</a>
                                <ul>
                                    <li>
                                        <a href="/newpost">New Post</a>
                                    </li>
                                    <li>
                                        <a onClick={logout}>Logout</a>
                                    </li>
                                </ul>
                            </li>
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
        <div className="dropdown">
            <nav>
                <a className="logo" href="/home">Project Sh@are</a>
                <div>
                    <input className='searchBar'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Search: " 
                        onKeyPress={e => handleKeyPress(e)}
                    />
                    {
                        searchAuthor ? 
                        <button onClick={click} className="switch-but-nav">Search by Author</button> : <button onClick={click} className="switch-but-nav">Search by Category</button>
                    }
                    <button className="search-button" onClick={push}>Search</button>
                </div>
                <ul>
                    <li>
                        <a className="trending" href="/trending">Trending</a>
                    </li>
                    <li>
                        <a className="leaderboard" href="/leaderboard">Leaderboard</a>
                    </li>
                    <li>
                        <a className="categories" href="/categories">Categories</a>
                    </li>
                    <li>
                        <a className="requests" href="/about">About</a>
                    </li>
                    <li>
                        {authentication}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation;