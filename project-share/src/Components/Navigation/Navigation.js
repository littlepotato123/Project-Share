import React from 'react'
import {
    Link
} from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
                <button className='searchButton'>Search</button>
                <input className='searchBar'/>
                <button>
                    <Link to="./trending">Trending</Link>
                </button>
                     
        </div>
    )
}

export default Navigation;