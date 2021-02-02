import React, { useState } from 'react';

const Home = () => {
    const [posts, setPosts] = useState(null);
    const [display, setDisplay] = useState(null);

    return (
        <div>
            {display}
        </div>
    )
}

export default Home;