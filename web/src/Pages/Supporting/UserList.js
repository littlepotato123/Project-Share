import React, { useEffect, useState } from 'react';
import { Fetch } from '../../Tools';

const UserList = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    user_token(token: "${props.id}") {
                        handle
                    } 
                } 
            `);
            if(res && res.tokenUser) {
                setUser(res.tokenUser);
            } else {
                alert('Error while getting user');
            }
        }
        scoped();
    }, [])

    return (
        <div>
            {
                user ? <h1>{user.handle}</h1> : <p>Loading...</p>
            }
        </div>
    )
}

export default UserList;