import React, { useEffect } from 'react';
import {
    useHistory
} from 'react-router-dom';

const HomeRedirect = () => {

    const history = useHistory()

    useEffect(() => {
        history.push('/home');
    }, [])
    
    return (
        <div>
            Go to /home
        </div>
    )
}

export default HomeRedirect;