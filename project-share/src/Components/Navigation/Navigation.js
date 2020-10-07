import React, { useState } from 'react'
import {
    useHistory
} from 'react-router-dom'; // For Redirecting Page 

const Navigation = () => {
    let history = useHistory(); 
    const [value, setValue] = useState(null);

    const search = () => {
        if(value) {
            history.push(`/user/${value}`)
        } else {
            console.log("YOu did something wrong")
        }
    }

    return (
        <div>
                <button onClick={search} className='searchButton' type="submit" >Search</button>
                <input 
                    className='searchBar' 
                    value={value} 
                    onChange={e => setValue(e.target.value)}
                    placeholder="Search by Username"
                />
            <button className='home' onClick={() => history.push('/')}>Home</button>
            <button className='trending' onClick={() => history.push('/trending')}>Trending</button>
            <button className='leaderboard' onClick={() => history.push('/leaderboard')}>Leaderboard</button>
            <button className='topPosts' onClick={() => history.push('/topPosts')}>Top Posts</button>
            <button className='categories' onClick={() => history.push('/categories')}>Categories</button>
        </div>
    )
}

export default Navigation;