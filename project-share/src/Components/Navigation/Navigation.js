import React from 'react'
// import {
//     Link
// } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
                <button className='searchButton'>Search</button>
                <input className='searchBar'/>
                <button>
                    <a href="/trending">
                        Trending
                    </a>
                </button>
                     
        </div>
    )
}

export default Navigation;