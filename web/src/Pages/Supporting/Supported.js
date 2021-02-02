import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fetch } from '../../Tools';
import UserList from './UserList';

const Supported = () => {
    const [list, setList] = useState(null);

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    user_handle(handle: "${handle}") {
                        supported
                    }
                }
            `);
            if(res) {
                setList(res.user.supported);
            } else {
                alert('User not found')
            }
        }
        scoped();
    }, [])

    const { handle } = useParams();

    return (
        <div>
            {
                list ?
                list.map(l => <UserList id={l} />) : <h1>Loading...</h1>
            }
        </div>
    )
}

export default Supported;