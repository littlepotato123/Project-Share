import React from 'react'
import { useSelector } from 'react-redux';

const TopPost = () => {
    const idToken = useSelector(state => state.idToken)

    return (
        <div>
            Top Posts
        </div>
    )
}

export default TopPost;